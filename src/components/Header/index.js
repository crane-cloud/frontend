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
    localStorage.removeItem('state');
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
                  <img src={ProfileIcon} alt="profile" />
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

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = {
  removeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
