import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import { ReactComponent as DownArrow } from '../../assets/images/downarrow.svg';
import removeUser from '../../redux/actions/removeUser';
import './Header.css';
import { DOCS_URL } from '../../config';

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
              <a href={`${DOCS_URL}`} className="HeaderLinkDocs">Docs</a>
              <Link to="/login" className="HeaderLinkLogin TurnLight">Login</Link>
            </div>
          )}
        </div>
      )}

      {user.accessToken && (
        <div className="HeaderLinksWrap LoggedIn">
          <div className="OnHeader" onClick={toggleHidden}>
            {match.path === '/' ? (
              <Link to={`/users/${user.data.id}/projects`} className="HeaderLinkBackToConsole TurnLight">dashboard</Link>
            ) : (
              <>
                <div className="UserNames">
                  {user.data.name}
                </div>
              </>
            )}

            <DownArrow
              ref={dropdownRef}
              className="DropdownArrowSvg"
            />
            {hidden && (
            <div ref={dropdownRef} className="BelowHeader">
              <div className="DropDownContent">
                <div className="DropDownLink" role="presentation" onClick={logout}>Logout</div>
              </div>
            </div>
          )}
          </div>
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
