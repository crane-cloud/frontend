import React, { useState, useEffect, useRef } from "react";
import "./SideNav.css";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as BackButton } from "../../assets/images/arrow-left.svg";
import Menu from "../../assets/images/menu.svg";
import useMedia from "../../hooks/mediaquery";

const SideNav = ({ clusterId, clusterName }) => {
  const BASE_URL = `/clusters/${clusterId}`;

  const isDesktop = useMedia();
  const [OpenForsmallScreen, setopenForsmallScreen] = useState(false);
  const BarRef = useRef(null);

  const handleClickOutsideBar = (event) => {
    if (BarRef.current && !BarRef.current.contains(event.target)) {
      setopenForsmallScreen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBar);
    };
  }, []);

  const HandleMenuClick = () => {
    setopenForsmallScreen(true);
  };

  return (
    <>
      {isDesktop || OpenForsmallScreen ? (
        <>
          <div
            ref={BarRef}
            className={OpenForsmallScreen ? "SmallSidebar" : "SideNav"}
          >
            <div>
              <Link
                to={{ pathname: "/clusters" }}
                className="SideNavTopSection CName"
              >
                <BackButton color="#fff" />
                {clusterName}
              </Link>
            </div>
            <Link
              to={{ pathname: `${BASE_URL}/resources` }}
              className="ListItem"
            >
              Infrastructure
            </Link>
            <div>
              <NavLink
                to={{ pathname: `${BASE_URL}/nodes` }}
                activeClassName="active"
                className="SubListItem"
              >
                Nodes
              </NavLink>
              <NavLink
                to={{ pathname: `${BASE_URL}/volumes` }}
                className="SubListItem"
              >
                Volumes
              </NavLink>
              <NavLink
                to={{ pathname: `${BASE_URL}/pvcs` }}
                className="SubListItem"
              >
                Volume Claims
              </NavLink>
              <NavLink
                to={{ pathname: `${BASE_URL}/storage-classes` }}
                className="SubListItem"
              >
                Storage Classes
              </NavLink>
              <NavLink
                to={{ pathname: `${BASE_URL}/namespaces` }}
                className="SubListItem"
              >
                Namespaces
              </NavLink>
            </div>
            <Link to={{ pathname: `${BASE_URL}/pods` }} className="ListItem">
              Pods
            </Link>
            <div>
              <NavLink
                to={{ pathname: `${BASE_URL}/pods` }}
                activeClassName="active"
                className="SubListItem"
              >
                Pods
              </NavLink>
              <Link to="#" className="SubListItem">
                Ingresses
              </Link>
              <NavLink
                to={{ pathname: `${BASE_URL}/services` }}
                className="SubListItem"
              >
                Services
              </NavLink>
            </div>
            <Link
              to={{ pathname: `${BASE_URL}/deployments` }}
              className="ListItem"
            >
              Controllers
            </Link>
            <div>
              <NavLink
                to={{ pathname: `${BASE_URL}/deployments` }}
                className="SubListItem"
              >
                Deployments
              </NavLink>
              <NavLink
                to={{ pathname: `${BASE_URL}/jobs` }}
                className="SubListItem"
              >
                Jobs
              </NavLink>
            </div>
            <Link to={{ pathname: "/databases" }} className="ListItem">
              Databases
            </Link>
            <div>
              <NavLink to={{ pathname: "/databases" }} className="SubListItem">
                Databases
              </NavLink>
            </div>
            <Link to={{ pathname: "/accounts" }} className="ListItem">
              Users
            </Link>
            <div>
              <NavLink to={{ pathname: "/accounts" }} className="SubListItem">
                Accounts
              </NavLink>
              <NavLink
                to={{ pathname: `${BASE_URL}/projects` }}
                className="SubListItem"
              >
                Projects
              </NavLink>
            </div>

            <div className="ListItem">Others</div>
            <div>
              <NavLink
                to={{
                  pathname: `${BASE_URL}/logs`,
                }}
                className="SubListItem"
              >
                Activity Logs
              </NavLink>
              <NavLink
                to={{
                  pathname: `${BASE_URL}/clusterSettings`,
                }}
                className="SubListItem"
              >
                Cluster settings
              </NavLink>
            </div>

            <div className="SideFooter StickBottom">
              Copyright {new Date().getFullYear()} Crane Cloud.
              <br />
              All Rights Reserved.
            </div>
          </div>
        </>
      ) : (
        <div
          className="MenuIcon"
          onClick={() => {
            HandleMenuClick();
          }}
        >
          <img src={Menu} alt="menu" />
        </div>
      )}
    </>
  );
};

export default SideNav;
