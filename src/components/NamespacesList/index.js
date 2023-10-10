import React, { useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import getNamespaces from "../../redux/actions/namespaces";
import Status from "../Status";
import tellAge from "../../helpers/ageUtility";
import Spinner from "../Spinner";
import AppFooter from "../appFooter";

const NamespacesListPage = () => {
  const clusterID = localStorage.getItem("clusterID");
  const dispatch = useDispatch();

  const adminNamespaces = useCallback(
    () => dispatch(getNamespaces(clusterID)),
    [dispatch, clusterID]
  );
  const { isRetrieving, namespacesList, isRetrieved } = useSelector(
    (state) => state.namespacesListReducer
  );

  useEffect(() => {
    adminNamespaces();
  }, [adminNamespaces]);

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
            <InformationBar header="Namespaces" showBtn={false} />
          </div>
          <div className="ContentSection">
            <div
              className={
                isRetrieving
                  ? "ResourcesTable LoadingResourcesTable"
                  : "ResourcesTable"
              }
            >
              <table>
                <thead className="uppercase">
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Age</th>
                  </tr>
                </thead>
                {isRetrieving ? (
                  <tbody>
                    <tr className="TableLoading">
                      <td className="TableTdSpinner">
                        <div className="SpinnerWrapper">
                          <Spinner size="big" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {isRetrieved &&
                      namespacesList.length !== 0 &&
                      namespacesList.map((namespace) => (
                        <tr key={namespacesList.indexOf(namespace)}>
                          <td>{namespace.metadata.name}</td>
                          <td className="StatusColumn">
                            <Status status={namespace.status.phase} />
                          </td>
                          <td>
                            {tellAge(namespace.metadata.creationTimestamp)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
              {isRetrieved && namespacesList.length === 0 && (
                <div className="AdminNoResourcesMessage">
                  <p>No namespaces available</p>
                </div>
              )}
              {!isRetrieving && !isRetrieved && (
                <div className="AdminNoResourcesMessage">
                  <p>
                    Oops! Something went wrong! Failed to retrieve namespaces.
                  </p>
                </div>
              )}
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};

export default NamespacesListPage;
