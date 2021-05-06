import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import { ReactComponent as DownArrow } from '../../assets/images/downarrow.svg';
import removeUser from '../../redux/actions/removeUser';
import Styles from './Header.module.css';
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
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    localStorage.removeItem('project');
    props.removeUser();
    window.location.href = '/';
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
    <header className={Styles.Header}>
      <Logo />


      {(!user.accessToken || user.accessToken === '') && (
        <div className={Styles.HeaderLinksWrap}>
          {match.path !== '/admin-login' && (
            <div className={Styles.HeaderLinks}>
              <Link to="/team" className={Styles.HeaderLinkDocs}>Team</Link>
              <a href={`${DOCS_URL}`} className={Styles.HeaderLinkDocs} rel="noopener noreferrer" target="_blank">Docs</a>
              <Link to="/login" className={`${Styles.HeaderLinkLogin} ${Styles.TurnLight}`}>Login</Link>
            </div>
          )}
        </div>
      )}

      {user.accessToken && (
        <div className={`{Styles.HeaderLinksWrap} {Styles.LoggedIn}`}>
          <div
            ref={dropdownRef}
            className={Styles.OnHeader}
            onClick={toggleHidden}
            role="presentation"
          >
            {match.path === '/' || match.path === '/team'? (
              <>
                <Link to="/team" className={Styles.StripBorder}>Team</Link>
                <Link to={`/users/${user.data.id}/projects`} className={`${Styles.HeaderLinkBackToConsole} ${Styles.TurnLight}`}>dashboard</Link>
              </>
            ) : (
              <>
                <div className={Styles.UserNames}>
                  {user.data.name}
                </div>
              </>
            )}

            <DownArrow
              className={Styles.DropdownArrowSvg}
            />
            {hidden && (
              <div className={Styles.BelowHeader}>
                <div className={Styles.DropDownContent}>
                  <a href={`${DOCS_URL}`} className={Styles.DropDownLink} rel="noopener noreferrer" target="_blank">Docs</a>
                  <div className={Styles.DropDownLink} role="presentation" onClick={logout}>Logout</div>
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
    accessToken: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
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
