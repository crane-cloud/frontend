import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewLogo from '../NewLogo';
import removeUser from '../../redux/actions/removeUser';
import './NewHeader.css';
import { DOCS_URL, BLOG_URL } from '../../config';

const NewHeader = (props) => {
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
    <header className="NewHeader">
      <NewLogo />


      {(!user.accessToken || user.accessToken === '') && (
        <div className="HeaderLinksWrap">
          {match.path !== '/admin-login' && (
            <div className="HeaderLink bold">
              <a href={`${DOCS_URL}`} className="HeaderLinkDocs" rel="noopener noreferrer" target="_blank">Docs</a>
              <a href={`${BLOG_URL}`} className="HeaderLinkDocs" rel="noopener noreferrer" target="_blank">Blog</a>
              <Link to="/login" className="HeaderLinkDocs">Login</Link>
            </div>
          )}
        </div>
      )}

      {user.accessToken && (
        <div
          ref={dropdownRef}
          className="HeaderLink"
          onClick={toggleHidden}
          role="presentation"
        >
          {match.path === '/' || match.path === '/team' ? (
            <>
              <a href={`${DOCS_URL}`} className="HeaderLinkDocs" rel="noopener noreferrer" target="_blank">Docs</a>
              <a href={`${BLOG_URL}`} className="HeaderLinkDocs" rel="noopener noreferrer" target="_blank">Blog</a>
              <Link to={`/users/${user.data.id}/projects`} className="HeaderLinkDocs">Dashboard</Link>
            </>
          ) : (null)}

        </div>
      )}

    </header>
  );
};

NewHeader.propTypes = {
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

NewHeader.defaultProps = {
  user: {}
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = {
  removeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewHeader));
