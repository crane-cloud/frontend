import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, matchPath } from "react-router-dom";
import { connect } from "react-redux";
import Avatar from "../Avatar";
import PropTypes from "prop-types";
import Logo from "../Logo";
import { ReactComponent as DownArrow } from "../../assets/images/downarrow.svg";
import { ReactComponent as Activity } from "../../assets/images/activity.svg";
import { ReactComponent as LogOut } from "../../assets/images/log-out.svg";
import { ReactComponent as User } from "../../assets/images/user.svg";
import { ReactComponent as Book } from "../../assets/images/book.svg";
import removeUser from "../../redux/actions/removeUser";
import styles from "./Header.module.css";
import { DOCS_URL } from "../../config";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";

const Header = (props) => {
  const { user, match } = props;
  const token = localStorage.getItem("token");

  const [hidden, setHidden] = useState(false);
  const dropdownRef = useRef(null);

  const toggleHidden = () => {
    if (hidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const pageUrl = matchPath(match.path, {
    path: "/login",
    exact: true,
    strict: true,
  });

  const logout = () => {
    localStorage.clear();
    props.removeUser();
    window.location.href = "/";
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setHidden(false);
    }
  };

  // componentWillMount & componentWillUnmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // const { removeUser } = props;

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { credits } = props;
  let displayName = user.data.name ? user.data.name : user.data.username;
  return (
    <header className={`${styles.Header} SmallContainer`}>
      <Logo />

      {token && pageUrl === null && (
        <div className={styles.HeaderLinksWrap}>
          <div
            ref={dropdownRef}
            className={styles.OnHeader}
            onClick={toggleHidden}
            role="presentation"
          >
            <>
              {match.path !== "/projects/:projectID/billing" && credits > 0 && (
                <div className={styles.Credits} title="credits">
                  {credits > 0 ? credits : 0}
                  <Coin />
                </div>
              )}
              <div className={styles.UserNames}>{displayName}</div>
            </>

            <DownArrow className={styles.DropdownArrowSvg} />
            {hidden && (
              <div className={styles.BelowHeader}>
                <Link to={`/profile`} className={styles.UserInformation}>
                  <Avatar name={displayName} className={styles.UserAvatar} />
                  <div className={styles.UserDetails}>
                    <div className={styles.HeaderUserName}>
                      {displayName.split(" ").slice(-1).join(" ")}
                    </div>
                    <div className={styles.UserDetails}>{user.data.email}</div>
                  </div>
                </Link>
                <div className={styles.DropDownContent}>
                  <a
                    href={`${DOCS_URL}`}
                    className={styles.DropDownLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Book />
                    Docs
                  </a>
                  <Link to={`/profile`} className={styles.DropDownLink}>
                    <User /> Profile
                  </Link>
                  <Link to={`/activity`} className={styles.DropDownLink}>
                    <Activity /> Activity
                  </Link>
                  <div
                    className={`${styles.DropDownLink} ${styles.RoundBottom}`}
                    role="presentation"
                    onClick={logout}
                  >
                    <LogOut />
                    Logout
                  </div>
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
    accessToken: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    data: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

Header.defaultProps = {
  user: {},
};

export const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = {
  removeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
