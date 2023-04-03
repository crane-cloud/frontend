import getStorageClassList from "../../redux/actions/storageClasses";
import tellAge from "../../helpers/ageUtility";
import "./StorageClassList.css";
import Header from "../Header";
import Spinner from "../Spinner";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const StorageClassList = () => {
  const { clusterID } = useParams();
  const dispatch = useDispatch();

  const storageResources = useCallback(
    () => dispatch(getStorageClassList(clusterID)),
    [dispatch, clusterID]
  );

  useEffect(() => {
    storageResources();
  }, [storageResources]);

  const { isRetrieving, storageClasses, isFetched } = useSelector(
    (state) => state.storageClassesReducer
  );
  const clusterName = localStorage.getItem("clusterName");
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
            <InformationBar header="Storage Classes" showBtn={false} />
          </div>
          <div className="ContentSection">
            <div
              className={
                isRetrieving
                  ? "ResourcesTable LoadingResourcesTable"
                  : "ResourcesTable"
              }
            >
              <table className="StorageClassesTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Provisioner</th>
                    <th>Age</th>
                  </tr>
                </thead>
                {isRetrieving ? (
                  <tbody>
                    <tr className="TableLoading">
                      <td>
                        <div className="SpinnerWrapper">
                          <Spinner size="big" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {isFetched &&
                      storageClasses.storage_classes !== undefined &&
                      storageClasses.storage_classes.map((storageClass) => (
                        <tr
                          key={storageClasses.storage_classes.indexOf(
                            storageClass
                          )}
                        >
                          <td>{storageClass.metadata.name}</td>
                          <td>{storageClass.provisioner}</td>
                          <td>
                            {tellAge(storageClass.metadata.creationTimestamp)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
              {isFetched && storageClasses.storage_classes.length === 0 && (
                <div className="NoResourcesMessage">
                  <p>No Storage Classes Available</p>
                </div>
              )}
              {!isRetrieving && !isFetched && (
                <div className="NoResourcesMessage">
                  <p>
                    Oops! Something went wrong! Failed to retrieve Storage
                    Classes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageClassList;
