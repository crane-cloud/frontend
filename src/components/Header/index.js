import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../Logo';
import ProfileIcon from '../../assets/images/profile.svg';
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
              <Link to="/" className="HeaderLinkPricing">pricing</Link>
              <Link to="/" className="HeaderLinkDocs">docs</Link>
              <Link to="/login" className="HeaderLinkLogin">login</Link>
            </div>
          )}
        </div>
      )}

      {user.accessToken && (
        <div className="HeaderLinksWrap LoggedIn">
          <div className="OnHeader">
            {match.path === '/' ? (
              <Link to={`${user.data.id}/projects`} className="HeaderLinkBackToConsole">dashboard</Link>
            ) : (
              <>
                <div className="ProfileIconWrap">
                  <img src={ProfileIcon} alt="profile" />
                </div>

                <div className="UserNames">
                  {user.data.name}
                </div>
              </>
            )}

            <div className="DropDownArrow">
              <img src={DownArrow} alt="down_arrow" onClick={toggleHidden} />
            </div>
          </div>

          {hidden && (
            <div className="BelowHeader">
              <div className="DropDownContent">
                <Link to="/profile" className="DropDownLink">Profile</Link>
                <Link to="/account" className="DropDownLink">Account</Link>
                <Link to="/settings" className="DropDownLink">Settings</Link>
                <div className="DropDownLink" onClick={logout}>Logout</div>
              </div>
            </div>
          )}
        </div>
      )
      }

    </header >
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = {
  removeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
