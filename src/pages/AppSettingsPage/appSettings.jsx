import React, { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import deleteApp from "../../redux/actions/deleteApp";
import updateApp from "../../redux/actions/updateApp";

import DashboardLayout from "../../components/Layouts/DashboardLayout";
import BlackInputText from "../../components/BlackInputText";
import DeleteWarning from "../../components/DeleteWarning";
import PrimaryButton from "../../components/PrimaryButton";
import AppStatus from "../../components/AppStatus";
import Feedback from "../../components/Feedback";
import Checkbox from "../../components/Checkbox";
import Spinner from "../../components/Spinner";
import Select from "../../components/Select";
import Modal from "../../components/Modal";

import { DisplayDateTime } from "../../helpers/dateConstants";
import { handleGetRequest } from "../../apis/apis";

import { ReactComponent as Upload } from "../../assets/images/upload-cloud.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/trash-2.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import "./AppSettingsPage.css";

const AppSettingsPage = () => {
  const dispatch = useDispatch();
  const { appID } = useParams();

  const loggedInUser = useSelector((state) => state.user);
  const { app, isRetrieving, isFetched } = useSelector(
    (state) => state.singleAppReducer
  );
  const { isUpdating, isUpdated, errorMessage } = useSelector(
    (state) => state.updateAppReducer
  );
  const { isDeleting, isDeleted, isFailed, message } = useSelector(
    (state) => state.deleteAppReducer
  );
  const { isReverting, isReverted } = useSelector(
    (state) => state.revertUrlReducer
  );

  const replicaOptions = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
  ];

  const [activeTab, setActiveTab] = useState("General Details");
  const [parentProject, setParentProject] = useState("");
  const [appDetail, setAppDetail] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [error, setError] = useState("");
  const [portError, setPortError] = useState("");
  const [commandError, setCommandError] = useState("");
  const [disableDelete, setDisableDelete] = useState(true);
  const [ConfirmAppname, setConfirmAppname] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [domainModal, setDomainModal] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [urlChecked, setUrlChecked] = useState(false);
  const [internalUrlChecked, setInternalUrlChecked] = useState(false);
  const [isPrivateImage, setIsPrivateImage] = useState(false);
  const [isCustomDomain, setIsCustomDomain] = useState(
    app?.has_custom_domain ? true : false
  );
  const [domainName, setDomainName] = useState("");
  const [uri, setUri] = useState(app?.uri ? app?.uri : "");
  const [varName, setVarName] = useState("");
  const [varValue, setVarValue] = useState("");
  const [envVars, setEnvVars] = useState({});
  const [entryCommand, setEntryCommand] = useState(
    app?.command ? app?.command : ""
  );
  const [port, setPort] = useState(app?.port ? app?.port : "");
  const [replicas, setReplicas] = useState("");
  const [updating_port, setUpdatingPort] = useState(false);
  const [updating_command, setUpdatingCommand] = useState(false);
  const [updating_form, setUpdatingForm] = useState(false);
  const [urlReverted, setUrlReverted] = useState(false);
  const [revisions, setRevisions] = useState([]);
  const [fetchingAppDetails, setFetchingAppDetails] = useState(true);
  const [revisionId, setRevisionId] = useState("");
  const [rollBackConfirmationModal, setRollBackConfirmationModal] =
    useState(false);
  const [revisingApp, setRevisingApp] = useState(false);
  const [revisingAppError, setRevisingAppError] = useState("");
  const [showAppDisableModal, setShowAppDisableModal] = useState(false);
  const [appDisableProgress, setAppDisableProgress] = useState(false);
  const [appDisableFailError, setAppDisableFailError] = useState("");
  const [dockerCredentials, setDockerCredentials] = useState({
    username: "",
    email: "",
    password: "",
    server: "",
    error: "",
  });

  const getApplicationDetails = useCallback(() => {
    handleGetRequest(`/apps/${appID}`)
      .then((response) => {
        setAppDetail(response.data.data.apps);
        setRevisions(response?.data?.data?.revisions);
        setFetchingAppDetails(false);
      })
      .catch((err) => {
        setError("Failed to fetch app revisions");
        setFetchingAppDetails(false);
      });
  }, [appID]);

  useEffect(() => {
    getApplicationDetails();
  }, [getApplicationDetails]);

  const fetchProjectDetails = useCallback(() => {
    handleGetRequest(`/projects/${appDetail?.project_id}`)
      .then((response) => {
        setParentProject(response.data.data.project);
      })
      .catch((error) => {
        setError("Failed to fetch project detail please refresh");
      });
  }, [appDetail?.project_id]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  // Handlers
  const handleDeleteApp = (e, appId) => {
    e.preventDefault();
    dispatch(deleteApp(appId));
  };

  const handleChange = () => {};
  const handleDockerCredentialsChange = () => {
    /* implementation */
  };
  const addEnvVar = () => {
    /* implementation */
  };
  const removeEnvVar = () => {
    /* implementation */
  };
  const handleSelectReplicas = () => {
    /* implementation */
  };
  const handleSubmit = () => {
    /* implementation */
  };
  const urlOnClick = () => {
    /* implementation */
  };
  const internalUrlOnClick = () => {
    /* implementation */
  };
  const handleCommandSubmit = () => {
    if (entryCommand === app.command) {
      setCommandError("Enter a new command.");
    } else if (entryCommand && entryCommand.length > 0) {
      setUpdatingCommand(true);
      updateApp(appID, { command: entryCommand });
    } else {
      setCommandError("Please enter a command");
    }
  };
  const handleEnvVarsSubmit = () => {
    updateApp(appID, { env_vars: envVars });
  };
  const handlePortSubmit = () => {
    // validate port and ensure its a number
    if (port && !/^[0-9]*$/.test(port)) {
      setPortError("Port should be an integer");
    } else {
      setUpdatingPort(true);
      updateApp(appID, { port: parseInt(port, 10) });
    }
  };
  const domainRevert = () => {
    /* implementation */
  };
  const disableRevert = () => {
    /* implementation */
  };
  const regenerate = () => {
    /* implementation */
  };
  const updatePage = () => {
    /* implementation */
  };
  const rollbackApp = () => {
    /* implementation */
  };
  const removeExistingEnvVar = () => {
    /* implementation */
  };

  const getCurrentRevision = (revisions) => {
    let currentRevision = (revisions || []).find(
      (revision) => revision.current === true
    );
    return currentRevision ? currentRevision.revision_id : null;
  };

  const handleEnableButtonClick = () => {
    /* implementation */
  };
  const handleCIClick = () => {
    /* implementation */
  };
  const renderRedirect = () => {
    /* implementation */
  };

  // Alerts
  const showDeleteAlert = () => {
    /* implementation */
  };
  const hideDeleteAlert = () => {
    /* implementation */
  };
  const showDomainModal = () => {
    /* implementation */
  };
  const hideDomainModal = () => {
    /* implementation */
  };
  const showDisableModal = () => {
    /* implementation */
  };
  const showUpdateModal = () => {
    /* implementation */
  };
  const hideUpdateModal = () => {
    /* implementation */
  };
  const showAppRevisionModal = () => {
    /* implementation */
  };
  const hideAppRevisionModal = () => {
    /* implementation */
  };

  // Toggles
  const togglePrivateImage = () => {
    setIsPrivateImage((prevIsPrivateImage) => !prevIsPrivateImage);
  };
  const toggleCustomDomain = () => {
    /* implementation */
  };

  return (
    <DashboardLayout name={appDetail?.name} header="Application Settings" short>
      <div>
        {isFetched && (
          <>
            <div className="AppPageLayout">
              <div className="APPSections">
                <div className="SectionTitle">Application Information</div>

                <div className="ApplicationTabsContainer">
                  <div className="ApplicationTabs">
                    <div
                      className={`tabItem ${
                        activeTab === "General Details"
                          ? "activeTab"
                          : "inactiveTab"
                      }`}
                      onClick={() => setActiveTab("General Details")}
                    >
                      General Details
                    </div>
                    <div
                      className={`tabItem ${
                        activeTab === "Image Settings"
                          ? "activeTab"
                          : "inactiveTab"
                      }`}
                      onClick={() => setActiveTab("Image Settings")}
                    >
                      Image Settings
                    </div>
                    <div
                      className={`tabItem ${
                        activeTab === "Environment and Ports"
                          ? "activeTab"
                          : "inactiveTab"
                      }`}
                      onClick={() => setActiveTab("Environment and Ports")}
                    >
                      Environment and Ports
                    </div>
                    <div
                      className={`tabItem ${
                        activeTab === "Domain and URLs"
                          ? "activeTab"
                          : "inactiveTab"
                      }`}
                      onClick={() => setActiveTab("Domain and URLs")}
                    >
                      Domain and URLs
                    </div>
                  </div>
                  <div className="tab-content">
                    {activeTab === "General Details" && (
                      <div className={`APPInstructions BigCard`}>
                        <div className="APPButtonRow">
                          <div className="AppLabel">Project Name</div>
                          <div className="flexa">{parentProject?.name}</div>
                        </div>
                        <div className="APPButtonRow">
                          <div className="AppLabel">Application Name</div>
                          <div className="flexa">{appDetail?.name}</div>
                        </div>
                        <div className="APPButtonRow">
                          <div className="AppLabel">Alias</div>
                          <div className="flexa">{appDetail?.alias}</div>
                        </div>
                        {/* <div className="APPButtonRow">
                          <div className="AppLabel">Image</div>
                          <div className="flexa">
                            <BlackInputText
                              required
                              placeholder={appDetail?.image}
                              name="newImage"
                              value={newImage ? newImage : appDetail?.image}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="APPButtonRow">
                          <div className="AppLabel">Private Image</div>
                          <Checkbox
                            isBlack
                            onClick={togglePrivateImage}
                            isChecked={isPrivateImage}
                          />
                        </div>

                        {isPrivateImage && (
                          <div className="PrivateImageTabContainer">
                              <div className="PrivateImageInputs">
                                <div className="APPButtonRow">
                                  <div className="AppLabel">Username</div>
                                  <div className="flexa">
                                    <BlackInputText
                                      required
                                      placeholder={
                                        appDetail.username
                                          ? appDetail.username
                                          : "Username"
                                      }
                                      name="username"
                                      value={dockerCredentials.username}
                                      onChange={(e) => {
                                        handleDockerCredentialsChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="APPButtonRow">
                                  <div className="AppLabel">Email</div>
                                  <div className="flexa">
                                    <BlackInputText
                                      required
                                      placeholder={
                                        appDetail.email
                                          ? appDetail.email
                                          : "Email"
                                      }
                                      name="email"
                                      value={dockerCredentials.email}
                                      onChange={(e) => {
                                        handleDockerCredentialsChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="APPButtonRow">
                                  <div className="AppLabel">Password</div>
                                  <div className="flexa">
                                    <BlackInputText
                                      required
                                      placeholder={
                                        appDetail.password
                                          ? appDetail.password
                                          : "Password"
                                      }
                                      name="password"
                                      value={dockerCredentials.password}
                                      onChange={(e) => {
                                        handleDockerCredentialsChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="APPButtonRow">
                                  <div className="AppLabel">
                                    Registry Server
                                  </div>
                                  <div className="flexa">
                                    <div className="InputFieldWithTooltip">
                                      <BlackInputText
                                        required
                                        placeholder="Registry Server"
                                        name="server"
                                        value={dockerCredentials.server}
                                        onChange={(e) => {
                                          handleDockerCredentialsChange(e);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {dockerCredentials.error && (
                                  <Feedback
                                    type="error"
                                    message={dockerCredentials.error}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        )} */}

                        {/* {loggedInUser.data.beta && (
                          <div className="APPButtonRow">
                            <div className="AppLabel">Custom Domain</div>
                            <Checkbox
                              isBlack
                              onClick={toggleCustomDomain}
                              isChecked={isCustomDomain}
                            />
                          </div>
                        )} */}

                        {/* {isCustomDomain && (
                          <div className="CustomDomainTabContainer">
                            <div index={1}>
                              <div className="CustomDomainInputs">
                                <div className="APPButtonRow">
                                  <div className="AppLabel">
                                    {appDetail?.has_custom_domain === true && (
                                      <span>Edit &nbsp;</span>
                                    )}
                                    Domain name
                                  </div>
                                  <div className="flexa">
                                    <BlackInputText
                                      required
                                      placeholder="Domain name"
                                      name="domainName"
                                      value={domainName.toLowerCase()}
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="Domain__Popup"
                                  onClick={showDomainModal}
                                >
                                  Click for more instructions on how to set up
                                  you custom domain.
                                </div>
                                <div className="RevertSection">
                                  <div className="FlexRevertSection">
                                    <div>
                                      <strong>Revert to URL</strong>
                                    </div>
                                    <div>
                                      Reverts to cranecloud's auto-generated
                                      URL.
                                    </div>
                                  </div>
                                  <div className="SectionButtons">
                                    <PrimaryButton
                                      className="RevertButton"
                                      onClick={domainRevert}
                                      disabled={urlReverted}
                                    >
                                      {isReverting ? <Spinner /> : "REVERT"}
                                    </PrimaryButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )} */}

                        {/* <div className="APPButtonRow">
                          <div className="AppLabel">Replicas</div>
                          <div className="flexa">
                            <div className="ReplicasSelect">
                              <Select
                                placeholder={
                                  "App has " +
                                  appDetail?.replicas +
                                  " replica(s)"
                                }
                                options={replicaOptions}
                                onChange={handleSelectReplicas}
                              />
                            </div>
                          </div>
                        </div> */}

                        <div className="APPButtonRow">
                          <div className="AppLabel">Application Status</div>
                          <div className="ShowStatus">
                            {appDetail.app_running_status === "disabled" ? (
                              <div className="DeployText">Disabled</div>
                            ) : appDetail.app_running_status === "running" ? (
                              <div className="StatusIcon">
                                <AppStatus
                                  appStatus={appDetail.app_running_status}
                                />
                                <div>&nbsp;Ready</div>
                              </div>
                            ) : (
                              <div className="StatusIcon">
                                <AppStatus
                                  appStatus={appDetail.app_running_status}
                                />
                                <div>&nbsp;Failing</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="APPButtonRow">
                          <div className="AppLabel">Age</div>
                          <div className="flexa">{appDetail.age}</div>
                        </div>
                        <div className="APPButtonRow">
                          <div className="AppLabel">Current Revision</div>
                          <div className="flexa">
                            {getCurrentRevision(revisions)}
                          </div>
                        </div>
                        {/* <div className="APPButtonRow">
                          <div className="AppLabel">Application Link</div>
                          {appDetail.url ? (
                            <div className="CopyDiv">
                              <div className="DBTDetail">{appDetail.url}</div>
                              <div className="CopyUrl">
                                <CopyText onClick={urlOnClick} />
                                {urlChecked ? <Checked /> : null}
                              </div>
                            </div>
                          ) : (
                            <>
                              {isReverting ? (
                                <Spinner />
                              ) : (
                                <div
                                  className="InnerContentWarnText"
                                  onClick={() => {
                                    regenerate();
                                  }}
                                >
                                  Click to re-generate url
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="APPButtonRow">
                          <div className="AppLabel">Internal URL</div>
                          <div className="CopyDiv">
                            <div className="DBTDetail">
                              {appDetail.internal_url}
                            </div>
                            <div className="CopyUrl">
                              <CopyText onClick={internalUrlOnClick} />
                              {internalUrlChecked ? <Checked /> : null}
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="APPButton">
                          <div className="UpperSection">
                            <PrimaryButton
                              disabled={isUpdating}
                              className={isUpdating && "deactivatedBtn"}
                              onClick={handleSubmit}
                            >
                              {isUpdating && updating_form ? (
                                <Spinner />
                              ) : (
                                "Update"
                              )}
                            </PrimaryButton>
                          </div>
                        </div> */}
                      </div>
                    )}
                    {activeTab === "Image Settings" && (
                      <>
                        <div className={`APPInstructions BigCard`}>
                          <div className="ImageSection">
                            <div className="APPButtonRow">
                              <div className="AppLabel">Application Image</div>
                              <div className="flexa">
                                <BlackInputText
                                  required
                                  placeholder={appDetail?.image}
                                  name="newImage"
                                  value={newImage ? newImage : appDetail?.image}
                                  onChange={(e) => {
                                    this.handleChange(e);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="APPButtonRow">
                              <div className="AppLabel">Replicas</div>
                              <div className="flexa">
                                <div className="ReplicasSelect">
                                  <Select
                                    placeholder={
                                      "App has " +
                                      appDetail?.replicas +
                                      " replica(s)"
                                    }
                                    options={replicaOptions}
                                    // onChange={this.handleSelectReplicas}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="APPButtonRow">
                              <div className="AppLabel">Private Image</div>
                              <Checkbox
                                isBlack
                                onClick={togglePrivateImage}
                                isChecked={isPrivateImage}
                              />
                            </div>
                            {isPrivateImage && (
                              <div className="PrivateImageTabContainer">
                                <div index={1}>
                                  <div className="PrivateImageInputs">
                                    <div className="APPButtonRow">
                                      <div className="AppLabel">Username</div>
                                      <div className="flexa">
                                        <BlackInputText
                                          required
                                          placeholder={
                                            app?.username
                                              ? app?.username
                                              : "Username"
                                          }
                                          name="username"
                                          onChange={(e) => {
                                            this.handleDockerCredentialsChange(
                                              e
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="APPButtonRow">
                                      <div className="AppLabel">Email</div>
                                      <div className="flexa">
                                        <BlackInputText
                                          required
                                          placeholder={
                                            app.email ? app.email : "Email"
                                          }
                                          name="email"
                                          onChange={(e) => {
                                            this.handleDockerCredentialsChange(
                                              e
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="APPButtonRow">
                                      <div className="AppLabel">Password</div>
                                      <div className="flexa">
                                        <BlackInputText
                                          required
                                          placeholder={
                                            app.password
                                              ? app.password
                                              : "Password"
                                          }
                                          name="password"
                                          onChange={(e) => {
                                            this.handleDockerCredentialsChange(
                                              e
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="APPButtonRow">
                                      <div className="AppLabel">
                                        Registry Server
                                      </div>
                                      <div className="flexa">
                                        <div className="InputFieldWithTooltip">
                                          <BlackInputText
                                            required
                                            placeholder="Registry Server"
                                            name="server"
                                            onChange={(e) => {
                                              this.handleDockerCredentialsChange(
                                                e
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {dockerCredentials.error && (
                                      <Feedback
                                        type="error"
                                        message={dockerCredentials.error}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === "Environment and Ports" && (
                      <div className={`APPInstructions BigCard`}></div>
                    )}
                    {activeTab === "Domain and URLs" && (
                      <div className={`APPInstructions BigCard`}></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="APPSections">
                <div className="SectionTitle">Application Revisions</div>

                <div className={`AppRevisionsDetails BigCard`}>
                  {[...revisions]
                    .sort((a, b) =>
                      a.current === b.current ? 0 : a.current ? -1 : 1
                    )
                    .map((entry, index) => (
                      <div className="APPInstruct" key={entry.revision_id}>
                        <div className="AppRevision">
                          <span>
                            <Upload className="Success" />
                          </span>
                          <span>
                            <div className="RevisionSummary">
                              <div className="LeftItems">
                                <span className="Entity">{entry.image}</span>{" "}
                                <span className="Time">
                                  {DisplayDateTime(new Date(entry.created_at))}
                                </span>
                              </div>
                              <div className="RightItems">
                                <div
                                  className="Rollback__Option"
                                  onClick={() =>
                                    showAppRevisionModal(entry.revision_id)
                                  }
                                >
                                  {JSON.stringify(entry.current)
                                    ? null
                                    : "Rollback here"}
                                </div>
                              </div>
                            </div>
                            <div className="RevisionStatus">
                              <div className="RevisionNumber">
                                {JSON.stringify(entry.current)
                                  ? "Current"
                                  : entry.revision_id}
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <Modal
                showModal={rollBackConfirmationModal}
                onClickAway={hideAppRevisionModal}
              >
                <div className="ReviseAppModal">
                  <div className="DeleteProjectModalUpperSection">
                    <div className="WarningContainer">
                      <div className="ReviseAppDescription">
                        Are you sure you want to revise your app?
                      </div>
                    </div>
                  </div>
                  <div className="ReviseAppModalLowerSection">
                    <div className="ReviseAppModalButtons">
                      <PrimaryButton
                        className="CancelBtn"
                        label="Cancel"
                        onClick={hideAppRevisionModal}
                      >
                        Cancel
                      </PrimaryButton>
                      <PrimaryButton onClick={(e) => rollbackApp(revisionId)}>
                        {revisingApp ? <Spinner /> : "Confirm"}
                      </PrimaryButton>
                    </div>
                  </div>
                  {revisingAppError && (
                    <Feedback type="error" message={"Failed to rollback"} />
                  )}
                </div>
              </Modal>

              {/* <div className="APPSections">
                <div className="SectionTitle">Environment Variables</div>
                <div className={`ModalFormInputsEnvVars BigCard`}>
                  <div>
                    {appDetail.env_vars && (
                      <div className="EnvData">
                        <div className="EnvDataItem">
                          <div>Name</div>
                          <div>Value</div>
                        </div>
                        {Object.keys(appDetail.env_vars).map(
                          (envVar, index) => (
                            <div key={index} className="EnvDataItem">
                              <div>{envVar}</div>
                              <div className="EnvValue">
                                <div style={{ flex: 1 }}>
                                  {appDetail.env_vars[envVar]}
                                </div>
                                <div
                                  className={
                                    isUpdating
                                      ? "RemoveIconUpdating"
                                      : "RemoveIconBtn"
                                  }
                                  onClick={() => removeExistingEnvVar(index)}
                                  title={
                                    isUpdating ? "Updating" : "Remove Item"
                                  }
                                >
                                  <DeleteIcon width={16} height={16} />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {Object.keys(envVars).length > 0 && (
                      <div className="EnvData">
                        {!appDetail.env_vars && (
                          <div className="EnvDataItem">
                            <div>key</div>
                            <div>Value</div>
                            <div></div>
                          </div>
                        )}

                        {Object.keys(envVars).map((envVar, index) => (
                          <div key={uuidv4()} className="EnvDataItem">
                            <div>{Object.keys(envVars)[index]}</div>
                            <div className="EnvValue">
                              <div style={{ flex: 1 }}>
                                {envVars[Object.keys(envVars)[index]]}
                              </div>
                              <div
                                className="RemoveIconBtn"
                                onClick={() => removeEnvVar(index)}
                                title="Remove Item"
                              >
                                <DeleteIcon width={16} height={16} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="EnvInputItem">
                    <div className="VarInputGroup">
                      <input
                        placeholder="Name"
                        name="varName"
                        value={varName}
                        className="varInput"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <input
                        placeholder="Value"
                        name="varValue"
                        value={varValue}
                        className="varInput"
                        style={{ flex: 1 }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <div className="EnvVarsAddBtn">
                      <PrimaryButton onClick={addEnvVar} color="primary" small>
                        Add
                      </PrimaryButton>
                    </div>
                  </div>
                  {error && (
                    <div className="errorCenterDiv">
                      <Feedback type="error" message={error} />
                    </div>
                  )}
                  {Object.keys(envVars).length > 0 && (
                    <div className="APPButton">
                      <div className="UpperSection">
                        <PrimaryButton
                          disabled={isUpdating}
                          onClick={handleEnvVarsSubmit}
                          small
                        >
                          {isUpdating ? <Spinner /> : "Update"}
                        </PrimaryButton>
                      </div>
                    </div>
                  )}
                </div>
              </div> */}

              {/* <div className="APPSections">
                <div className="SectionTitle">Port & Entry commands</div>
                <div className={`AppOtherSection BigCard`}>
                  <div className="PortSection">
                    <div>Port</div>
                    <div>
                      <input
                        type="text"
                        placeholder={appDetail.port}
                        name="port"
                        value={port}
                        className="portInput"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <div className="APPOptionsButton">
                      <PrimaryButton
                        disabled={isUpdating}
                        onClick={handlePortSubmit}
                        small
                      >
                        {isUpdating && updating_port ? <Spinner /> : "Update"}
                      </PrimaryButton>
                    </div>
                  </div>
                  <div className="PortSection">
                    <div>Entry Command</div>
                    <div className="commandInputSection">
                      <div>
                        <input
                          type="text"
                          placeholder={
                            appDetail.command ? appDetail.command : "command"
                          }
                          name="entryCommand"
                          value={entryCommand}
                          className="portInput"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="APPOptionsButton">
                      <PrimaryButton
                        disabled={isUpdating}
                        // className={isUpdating && styles.deactivatedBtn}
                        onClick={handleCommandSubmit}
                        small
                      >
                        {isUpdating && updating_command ? (
                          <Spinner />
                        ) : (
                          "Update"
                        )}
                      </PrimaryButton>
                    </div>
                  </div>
                  {portError && (
                    <div className="errorCenterDiv">
                      <Feedback type="error" message={portError} />
                    </div>
                  )}
                  {errorMessage && (
                    <div className="errorCenterDiv">
                      <Feedback type="error" message={errorMessage} />
                    </div>
                  )}
                  {commandError && (
                    <div className="errorCenterDiv">
                      <Feedback type="error" message={commandError} />
                    </div>
                  )}
                </div>
              </div> */}

              <>
                <div className="SectionTitle">Manage Application</div>
                <div className="ProjectInstructions">
                  <div className="MemberBody">
                    <div className="MemberTableRow">
                      <div className="SettingsSectionInfo2">
                        <div className="SubTitle">Setup CI/CD</div>
                        <div className="SubTitleContent">
                          Setup continuous integration for you application
                        </div>
                      </div>
                      <div className="SectionButtons">
                        <PrimaryButton onClick={handleCIClick}>
                          Set up CI/CD
                        </PrimaryButton>
                      </div>
                    </div>
                    <div className="MemberTableRow">
                      <div className="SettingsSectionInfo2">
                        <div className="SubTitle">
                          {appDetail?.disabled ? "Enable" : "Disable"}{" "}
                          Application
                        </div>
                        <div className="SubTitleContent">
                          {appDetail?.disabled
                            ? "This will allow access to application and its resources"
                            : "This will temporarily disable your application and its resources"}
                        </div>
                      </div>

                      <div className="SectionButtons">
                        <PrimaryButton
                          onClick={(e) => {
                            e.preventDefault();
                            showDisableModal();
                          }}
                          color={appDetail?.disabled ? "primary" : "red"}
                        >
                          {appDetail?.disabled ? "Enable" : "Disable"}
                        </PrimaryButton>
                      </div>
                    </div>
                    <div className="MemberTableRow">
                      <div className="SettingsSectionInfo2">
                        <div className="SubTitle">Delete Application</div>
                        <div className="SubTitleContent">
                          This will permanently delete your application
                        </div>
                      </div>
                      <div className="SectionButtons">
                        <PrimaryButton onClick={showDeleteAlert} color="red">
                          Delete App
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </div>
              </>

              {showAppDisableModal && (
                <div className="AppDeleteModel">
                  <Modal
                    showModal={showAppDisableModal}
                    onClickAway={() => setShowAppDisableModal(false)}
                  >
                    <div className="DeleteAppModel">
                      <div className="DeleteModalUpperSection">
                        <div className="WarningContainer">
                          <div className="DeleteDescription">
                            {` Are you sure you want to ${
                              appDetail?.disabled ? "enable" : "disable"
                            }  `}
                            <span>{appDetail.name}</span>
                            &nbsp;?
                          </div>
                          <div className="DeleteSubDescription">
                            {appDetail?.disabled
                              ? "Allow access to App resources and enable billing"
                              : "Prevent App from being billed by blocking access to it's resources."}
                          </div>
                        </div>
                      </div>

                      <div className="DeleteModalLowerSection">
                        <div className="DeleteAppModelButtons">
                          <PrimaryButton
                            className="CancelBtn"
                            onClick={() => setShowAppDisableModal(false)}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            // className={disableDelete && styles.InactiveDelete}
                            color={!appDetail?.disabled && "red"}
                            disabled={appDisableProgress}
                            onClick={handleEnableButtonClick}
                          >
                            {appDisableProgress ? <Spinner /> : "Confirm"}
                          </PrimaryButton>
                        </div>

                        {message && (
                          <Feedback
                            type={isFailed ? "error" : "success"}
                            message={message}
                          />
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
              {openDeleteAlert && (
                <div className="AppDeleteModel">
                  <Modal
                    showModal={openDeleteAlert}
                    onClickAway={hideDeleteAlert}
                  >
                    <div className="DeleteAppModel">
                      <div className="DeleteModalUpperSection">
                        <div className="WarningContainer">
                          <div className="DeleteDescription">
                            Are you sure you want to delete&nbsp;
                            <span>{appDetail.name}</span>
                            &nbsp;?
                          </div>
                          <div className="DeleteSubDescription">
                            This will permanently delete the application. Please
                            confirm by typing{" "}
                            <b className="DeleteWarning">{appDetail.name}</b>{" "}
                            below.
                          </div>
                          <div className="InnerModalDescription">
                            <BlackInputText
                              required
                              placeholder={app.name}
                              name="ConfirmAppname"
                              value={ConfirmAppname}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            <DeleteWarning textAlignment="Left" />
                          </div>
                        </div>
                      </div>

                      <div className="DeleteModalLowerSection">
                        <div className="DeleteAppModelButtons">
                          <PrimaryButton
                            className="CancelBtn"
                            onClick={hideDeleteAlert}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            className={disableDelete && "InactiveDelete"}
                            color={!disableDelete && "red"}
                            disabled={disableDelete}
                            onClick={(e) => handleDeleteApp(e, appID)}
                          >
                            {isDeleting ? <Spinner /> : "Delete"}
                          </PrimaryButton>
                        </div>

                        {message && (
                          <Feedback
                            type={isFailed ? "error" : "success"}
                            message={message}
                          />
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
              {domainModal && (
                <div className="AppDeleteModel">
                  <Modal showModal={domainModal} onClickAway={hideDomainModal}>
                    <div className="DomainModal__Main">
                      <div className="DomainModal__Title">
                        Instructions on how to add an A-Record{" "}
                      </div>
                      <div className="DomainModal__Description">
                        <div className="Description__Step">
                          <div className="Step__Title">Step 1.</div>
                          <div className="Step__Description">
                            <div>
                              Login to your domain register account (e.g.
                              GoDaddy, NameCheap, Google Domains), then locate
                            </div>
                            <div>
                              {" "}
                              the DNS settings or management page for your
                              domain.
                            </div>
                          </div>
                        </div>
                        <div className="Description__Step">
                          <div className="Step__Title">Step 2.</div>
                          <div className="Step__Description">
                            <div>
                              Add A-Records. Add A-records inorder to use your
                              root domain(i.e custom domain).
                            </div>
                            <div>
                              Edit any existing A Records with Host Name @
                            </div>
                            <div>
                              Do not edit or delete A-Records for Mail or Email
                              as it could interfere with your email service.{" "}
                            </div>
                            <div>
                              An example of A-records with the IP address we
                              shall provide you;
                            </div>
                            <ul>
                              <li>A-Record: 3.209.XX.XX</li>
                              <li>Host or Name: @</li>
                              <li>Points To: 3.209.XX.XX</li>
                              <li>TTL: 1 Hour</li>
                              <li>Click: Save</li>
                            </ul>
                            <div>
                              <strong>Note:</strong> DNS settings may look
                              different for each
                            </div>
                          </div>
                        </div>
                        <div className="Description__button">
                          <button onClick={hideDomainModal}>OK</button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AppSettingsPage;
