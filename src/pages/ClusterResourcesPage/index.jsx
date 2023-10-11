/* eslint-disable linebreak-style */
import React, { useEffect, useCallback } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./ClusterResourcesPage.css";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import Spinner from "../../components/Spinner";
import SideNav from "../../components/SideNav";
import getClusterResourcesCount from "../../redux/actions/clusterResources";
import NewResourceCard from "../../components/NewResourceCard";
import AppFooter from "../../components/appFooter";

const ClusterResourcesPage = () => {
  const { clusterID } = useParams();
  const dispatch = useDispatch();

  const location = useLocation();
  const clusterName = location.state?.clusterName;

  const clusterResources = useCallback(
    () => dispatch(getClusterResourcesCount(clusterID)),
    [dispatch, clusterID]
  );

  useEffect(() => {
    clusterResources();
  }, [clusterResources]);

  const { isRetrieving, isRetrieved, resourceCount } = useSelector(
    (state) => state.clusterResourcesReducer
  );
  //global cluster access
  localStorage.setItem("clusterName", clusterName);
  localStorage.setItem("clusterID", clusterID);
  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="MainSection">
        <div className="SideBarSection">
          <SideNav clusterName={clusterName} clusterId={clusterID} />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar header="Overview" showBtn={false} />
          </div>
          <div className="ContentSection">
            {isRetrieving ? (
              <div className="ResourceSpinnerWrapper">
                <Spinner size="big" />
              </div>
            ) : (
              <div className="ClusterContainer">
                {isRetrieved &&
                  resourceCount !== undefined &&
                  resourceCount.map((resource) => (
                    <Link
                      to={{
                        pathname: `/clusters/${clusterID}/${resource.name.toLowerCase()}`,
                      }}
                      key={resourceCount.indexOf(resource)}
                      className="CardLink"
                    >
                      <NewResourceCard
                        title={resource.name}
                        count={resource.count}
                      />
                    </Link>
                  ))}
              </div>
            )}
            {isRetrieved && resourceCount.length === 0 && (
              <div className="NoResourcesMessage">
                <p>No Cluster Resources available</p>
              </div>
            )}
            {!isRetrieving && !isRetrieved && (
              <div className="NoResourcesMessage">
                <p>
                  Oops! Something went wrong! Failed to retrieve Cluster
                  Resources.
                </p>
              </div>
            )}
          </div>
          <AppFooter/>
        </div>
      </div>
    </div>
  );
};

export default ClusterResourcesPage;
