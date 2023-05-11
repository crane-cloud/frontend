import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NewLogo from "../NewLogo";
import removeUser from "../../redux/actions/removeUser";
import "./NewHeader.css";
import { DOCS_URL } from "../../config";
import useMedia from "../../hooks/mediaquery";
import { ReactComponent as DownArrow } from "../../assets/images/down-arrow-black.svg";
import { ReactComponent as UpArrow } from "../../assets/images/up-arrow.svg";

const NewHeader = (props) => {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { match } = props;
  const token = localStorage.getItem("token");

  const toggleHidden = () => {
    if (hidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };
  const isDesktop = useMedia();
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setHidden(false);
    }
    if (!isDesktop && open === false) {
      setOpen(false);
    }
  };
  const handleArrowClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // componentWillMount & componentWillUnmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <header className="NewHeader">
      <NewLogo />
      {isDesktop ? (
        <>
          {(!token || token === "") && (
            <div className="HeaderLinksWrap">
              {(match.path === "/terms-of-service" ||
                match.path === "/privacy-policy" ||
                match.path === "/contact") && (
                <div className="HeaderLink bold">
                  <Link to="/" className="HeaderLinkDocs">
                    Home
                  </Link>
                </div>
              )}
              {match.path !== "/admin-login" && (
                <div className="HeaderLink bold">
                  <a
                    href={`${DOCS_URL}`}
                    className="HeaderLinkDocs"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Docs
                  </a>
                  {/* <Link to="/pricing" className="HeaderLinkDocs">
                    Pricing
                  </Link> */}
                  <Link to="/login" className="HeaderLinkDocs">
                    Login
                  </Link>
                </div>
              )}
            </div>
          )}
          {token && (
            <div
              ref={dropdownRef}
              className="HeaderLink"
              onClick={toggleHidden}
              role="presentation"
            >
              {match.path === "/" || match.path === "/team" ? (
                <>
                  <a
                    href={`${DOCS_URL}`}
                    className="HeaderLinkDocs"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Docs
                  </a>
                  {/* <Link to="/pricing" className="HeaderLinkDocs">
                    Pricing
                  </Link> */}
                  <Link to={`/projects`} className="HeaderLinkDocs">
                    Dashboard
                  </Link>
                </>
              ) : null}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="Headerarrow">
            {!open && (
              <div className="DownArrowWrapper" onClick={handleArrowClick}>
                <DownArrow />
              </div>
            )}
            {open && (
              <div className="UpArrowWrapper" onClick={handleArrowClick}>
                <UpArrow />
              </div>
            )}
          </div>
          {open && (
            <div className="HeaderDropdown">
              {(!token || token === "") && (
                <div className="HeaderDropItems">
                  {match.path !== "/admin-login" && (
                    <div className="HeaderDropLinks bold">
                      <a
                        href={`${DOCS_URL}`}
                        className="HeaderDropLinkDocs"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Docs
                      </a>
                      
                      {/* <Link to="/pricing" className="HeaderDropLinkDocs">
                        Pricing
                      </Link> */}
                      <Link to="/login" className="HeaderDropLinkDocs">
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              )}
              {token && (
                <div
                  ref={dropdownRef}
                  className="HeaderDropdown"
                  onClick={toggleHidden}
                  role="presentation"
                >
                  <div className="HeaderDropLinks">
                    {match.path === "/" ? (
                      <>
                        <a
                          href={`${DOCS_URL}`}
                          className="HeaderDropLinkDocs"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Docs
                        </a>
                        {/* <Link to="/pricing" className="HeaderDropLinkDocs">
                          Pricing
                        </Link> */}
                        <Link to={`/projects`} className="HeaderDropLinkDocs">
                          Dashboard
                        </Link>
                      </>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </header>
  );
};

NewHeader.propTypes = {
  removeUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    // accessToken: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    data: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

NewHeader.defaultProps = {
  user: {},
};

export const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = {
  removeUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewHeader));
