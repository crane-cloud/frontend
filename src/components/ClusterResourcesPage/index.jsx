/* eslint-disable linebreak-style */
import React, { useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./ClusterResourcesPage.css";
import Header from "../Header";
import InformationBar from "../InformationBar";
import Spinner from "../Spinner";
import SideNav from "../SideNav";
import ResourceCard from "../ResourceCard";
import getClusterResourcesCount from "../../redux/actions/clusterResources";

const ClusterResourcesPage = () => {
  const { clusterID } = useParams();
  const dispatch = useDispatch();

  const clusterResources = useCallback(
    () => dispatch(getClusterResourcesCount(clusterID)),
    [dispatch, clusterID],
  )

  useEffect(() => {
    clusterResources();
  }, [clusterResources]);

  const { isRetrieving, isRetrieved, resourceCount, clusterName } = useSelector(state => state.clusterResourcesReducer);
  localStorage.setItem("clusterName", clusterName);

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
                        pathname: `/clusters/${
                          clusterID
                        }/${resource.name.toLowerCase()}`,
                      }}
                      key={resourceCount.indexOf(resource)}
                    >
                      <ResourceCard
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
        </div>
      </div>
    </div>
  );
};

export default ClusterResourcesPage;
