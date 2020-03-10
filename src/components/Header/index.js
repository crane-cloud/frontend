import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../Logo';
import ProfileIcon from '../../assets/images/profile.svg';
import DownArrow from '../../assets/images/downarrow.svg';
import removeUser from '../../redux/actions/removeUser';
import './Header.css';

const Header = (props) => {
  const { user } = props;

  const logout = () => {
    props.removeUser();
    window.location.href = '/';
  };

  return (
    <header className="Header">
      <div className="LogoWrap">
        <Logo />
      </div>

      {/* {!user.accessToken && (
        <div className="HeaderLinksWrap">
          <div className="HeaderLinks bold uppercase">
            <Link to="/" className="HeaderLinkPricing">pricing</Link>
            <Link to="/" className="HeaderLinkDocs">docs</Link>
            <Link to="/login" className="HeaderLinkLogin">login</Link>
          </div>
        </div>
      )} */}

      {/* {( */}
      <div className="HeaderLinksWrap LoggedIn">
        <div className="OnHeader">
          <div className="ProfileIconWrap">
            <img src={ProfileIcon} alt="profile" />
          </div>

          <div className="UserNames">
            {user.data.name}
            Steve Araka
          </div>

          <div className="DropDownArrow">
            <img src={DownArrow} alt="down_arrow" />
          </div>
        </div>
        <div className="BelowHeader">
          <div className="DropDownContent">
            <div className="DropDownLink">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="DropDownLink">
              <Link to="/profile">Account</Link>
            </div>
            <div className="DropDownLink">
              <Link to="/profile">Settings</Link>
            </div>
            <div className="DropDownLink" onClick={logout}>
              Logout
            </div>
          </div>
        </div>
      </div>
      {/* )} */}

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
