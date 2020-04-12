import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import DownArrow from '../../assets/images/downarrow.svg';
import removeUser from '../../redux/actions/removeUser';
import './Header.css';

const Header = (props) => {
  const [hidden, setHidden] = useState(false);
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

  return (
    <header className="Header">
      <div className="LogoWrap">
        <Logo />
      </div>

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
                <Link to="#">
                  <div className="UserNames" onClick={toggleHidden}>
                    {user.data.name}
                  </div>
                </Link>
              </>
            )}

            <div className="DropDownArrow" onClick={toggleHidden}>
              <img src={DownArrow} alt="down_arrow" />
            </div>
          </div>

          {hidden && (
            <div className="BelowHeader">
              <div className="DropDownContent">
                <Link to="#" className="DropDownLink">Profile</Link>
                <Link to="#" className="DropDownLink">Account</Link>
                <Link to="#" className="DropDownLink">Settings</Link>
                <div className="DropDownLink" onClick={logout}>Logout</div>
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
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = {
  removeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
