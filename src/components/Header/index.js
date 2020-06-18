import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import { ReactComponent as DownArrow } from '../../assets/images/downarrow.svg';
import removeUser from '../../redux/actions/removeUser';
import './Header.css';

const Header = (props) => {
  const [hidden, setHidden] = useState(false);
  const dropdownRef = useRef(null);
  const { user, match } = props;

  const toggleHidden = () => {
    if (hidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const logout = () => {
    props.removeUser();
    window.location.href = '/';
    localStorage.removeItem('state');
    localStorage.removeItem('token');
  };

  const nameStringToHslColor = (name) => {
    let hash = 0;
    let i = 0;
    for (i; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash); // eslint-disable-line no-bitwise
    }
    const h = hash % 360;
    return `hsl(${h}, 30%, 80%)`; // syntax: hsl(h, s%, l%)
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setHidden(false);
    }
  };

  // componentWillMount & componentWillUnmount
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="Header">
      <Logo />

      {!user.accessToken && (
        <div className="HeaderLinksWrap">
          {match.path !== '/admin-login' && (
            <div className="HeaderLinks bold uppercase">
              <Link to="#" className="HeaderLinkPricing">pricing</Link>
              <Link to="#" className="HeaderLinkDocs">docs</Link>
              <Link to="/login" className="HeaderLinkLogin TurnLight">login</Link>
            </div>
          )}
        </div>
      )}

      {user.accessToken && (
        <div className="HeaderLinksWrap LoggedIn">
          <div className="OnHeader">
            {match.path === '/' ? (
              <Link to={`/users/${user.data.id}/projects`} className="HeaderLinkBackToConsole TurnLight">dashboard</Link>
            ) : (
              <>

                <div className="ProfileIconWrap">
                  <div
                    className="UserAvatar"
                    style={{ backgroundColor: nameStringToHslColor(user.data.name), color: '#555' }}
                  >
                    {user.data.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="UserNames">
                  {user.data.name}
                </div>
              </>
            )}

            <DownArrow
              onClick={toggleHidden}
              ref={dropdownRef}
              className="DropdownArrowSvg"
            />
          </div>

          {hidden && (
            <div ref={dropdownRef} className="BelowHeader">
              <div className="DropDownContent">
                <div className="DropDownLink">Profile</div>
                <div className="DropDownLink">Account</div>
                <div className="DropDownLink">Settings</div>
                <div className="DropDownLink" role="presentation" onClick={logout}>Logout</div>
              </div>
            </div>
          )}
        </div>
      )}

    </header>
  );
};

Header.propTypes = {
  removeUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
    data: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

Header.defaultProps = {
  user: {}
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = {
  removeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
