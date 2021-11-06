import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logo from "../Logo";
import { ReactComponent as DownArrow } from "../../assets/images/downarrow.svg";
import removeUser from "../../redux/actions/removeUser";
import styles from "./Header.module.css";
import { DOCS_URL } from "../../config";

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
    localStorage.removeItem("state");
    localStorage.removeItem("token");
    localStorage.removeItem("project");
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

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.Header}>
      <Logo />

      {(!user.accessToken || user.accessToken === "") && (
        <div className={styles.HeaderLinksWrap}>
          {match.path !== "/admin-login" && (
            <div className={styles.HeaderLinks}>
              <Link to="/team" className={styles.HeaderLinkDocs}>
                Team
              </Link>
              <a
                href={`${DOCS_URL}`}
                className={styles.HeaderLinkDocs}
                rel="noopener noreferrer"
                target="_blank"
              >
                Docs
              </a>
              <Link
                to="/login"
                className={`${styles.HeaderLinkLogin} ${styles.TurnLight}`}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}

      {user.accessToken && (
        <div className={styles.HeaderLinksWrap}>
          <div
            ref={dropdownRef}
            className={styles.OnHeader}
            onClick={toggleHidden}
            role="presentation"
          >
            {match.path === "/" || match.path === "/team" ? (
              <>
                <Link to="/team" className={styles.StripBorder}>
                  Team
                </Link>
                <Link
                  to={`/projects`}
                  className={`${styles.HeaderLinkBackToConsole} ${styles.TurnLight}`}
                >
                  dashboard
                </Link>
              </>
            ) : (
              <>
                <div className={styles.UserNames}>{user.data.name}</div>
              </>
            )}

            <DownArrow className={styles.DropdownArrowSvg} />
            {hidden && (
              <div className={styles.BelowHeader}>
                <div className={styles.DropDownContent}>
                  <a
                    href={`${DOCS_URL}`}
                    className={styles.DropDownLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Docs
                  </a>
                  <div
                    className={styles.DropDownLink}
                    role="presentation"
                    onClick={logout}
                  >
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

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = {
  removeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
