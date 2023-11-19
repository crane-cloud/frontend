import React, { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { clearState } from "../../redux/actions/deleteApp";
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
import {
  handleGetRequest,
  handlePostRequestWithOutDataObject,
} from "../../apis/apis";

import { ReactComponent as Upload } from "../../assets/images/upload-cloud.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import "./AppSettingsPage.css";

const AppSettingsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
  const [submitMessage, setSubmitMessage] = useState("");
  const [envError, setEnvError] = useState("");
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
  const [entryCommand, setEntryCommand] = useState("");
  const [port, setPort] = useState("");
  const [replicas, setReplicas] = useState("");
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
        setEnvVars(response?.data?.data?.apps?.env_vars);
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

  useEffect(() => {
    setEnvVars({ ...appDetail.env_vars, ...envVars });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appDetail.env_vars]);

  console.log("appDetail", appDetail);

  // Handlers
  const handleDeleteApp = (e, appId) => {
    e.preventDefault();

    dispatch(deleteApp(appId))
      .then(() => {
        dispatch(clearState());

        // redirect user to the project apps dashboard page
        const projectID = appDetail.project_id;
        window.location.href = `/projects/${projectID}/dashboard`;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // clear regardless of success/fail
        dispatch(clearState());
      });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.value);
  };

  const handleSelectReplicas = (selectedOption) => {
    setReplicas(selectedOption.id);
  };

  const handleDockerCredentialsChange = (e) => {
    const { name, value } = e.target;
    setDockerCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleImageSectionSubmit = () => {
    const updatePayload = {
      ...(newImage !== appDetail?.image && { image: newImage }),
      ...(replicas !== appDetail?.replicas && { replicas }),
      ...(isPrivateImage && { privateImage: isPrivateImage }),
      ...dockerCredentials,
    };

    // Check if the payload is empty (no changes)
    if (Object.keys(updatePayload).length === 0) {
      setSubmitMessage("No changes to submit.");
    } else {
      // Proceed with the update operation
      updateApp(appID, updatePayload);
      setSubmitMessage("");
    }
  };

  const urlOnClick = () => {
    navigator.clipboard.writeText(appDetail.url);
    setUrlChecked(true);
  };

  const internalUrlOnClick = () => {
    navigator.clipboard.writeText(appDetail.internal_url);
    setInternalUrlChecked(true);
  };

  const rollbackApp = (revisionId) => {
    const projectID = appDetail.project_id;
    setRevisingApp(true);

    handlePostRequestWithOutDataObject(
      revisionId,
      `/apps/${appID}/revise/${revisionId}`
    )
      .then(() => {
        window.location.href = `/projects/${projectID}/apps/${appID}/settings`;
        setRevisingApp(false);
      })
      .catch((error) => {
        setError(error);
        setRevisingApp(false);
      });
  };

  const handleEnvChange = (e) => {
    const { name, value } = e.target;

    if (name === "varName") {
      setVarName(value);
    } else if (name === "varValue") {
      setVarValue(value);
    } else if (name === "entryCommand") {
      setEntryCommand(value);
    } else if (name === "port") {
      setPort(value);
    }
  };

  const handleEnvSubmit = () => {
    let updatePayload = {};

    // Check if 'port' has changed from the original, and if so, add to payload
    if (port.toString() !== appDetail.port.toString()) {
      updatePayload = { ...updatePayload, port: parseInt(port, 10) };
    }

    // Check if 'entryCommand' has changed from the original, and if so, add to payload
    if (entryCommand !== appDetail.command) {
      updatePayload = { ...updatePayload, command: entryCommand };
    }

    // Similarly, for 'envVars' (NODE_ENV), check if any have changed, and include the updated ones
    // Assuming 'envVars' state holds all your environment variables, not just NODE_ENV
    if (haveEnvVarsChanged(envVars, appDetail.env_vars)) {
      updatePayload = { ...updatePayload, env_vars: envVars };
    }

    // Now send the updatePayload to your update function
    // This should contain only the fields that have actually changed
    if (Object.keys(updatePayload).length > 0) {
      updateApp(appID, updatePayload);
    } else {
      // Handle case where nothing has changed
      console.log("No changes to update.");
    }
  };

  const haveEnvVarsChanged = (newEnvVars, originalEnvVars) => {
    return Object.keys(newEnvVars).some(
      (key) => newEnvVars[key] !== originalEnvVars[key]
    );
  };

  const addEnvVar = () => {
    if (varName.trim() && varValue.trim()) {
      setEnvVars((prevEnvVars) => ({
        ...prevEnvVars,
        [varName.trim()]: varValue.trim(),
      }));
      // Reset the input fields
      setVarName("");
      setVarValue("");
    } else {
      setEnvError("Provide an environment variable key and value.");
    }
  };

  const removeExistingEnvVar = (index) => {
    const keyToRemove = Object.keys(envVars)[index];
    const newEnvVars = Object.keys(envVars).reduce((object, key) => {
      if (key !== keyToRemove) {
        object[key] = envVars[key];
      }
      return object;
    }, {});
    setEnvVars(newEnvVars);
  };

  const getCurrentRevision = (revisions) => {
    let currentRevision = (revisions || []).find(
      (revision) => revision.current === true
    );
    return currentRevision ? currentRevision.revision_id : null;
  };

  const handleEnableButtonClick = async () => {
    setAppDisableProgress(true);
    setError("");

    try {
      const path = `/apps/${appID}/${
        appDetail.disabled ? "enable" : "disable"
      }`;
      await handlePostRequestWithOutDataObject(appID, path);
      window.location.reload();
    } catch (error) {
      setError("Request failed, please try again later");
    } finally {
      setAppDisableProgress(false);
    }
  };

  const handleCIClick = () => {
    history.push(`/apps/${appID}/webhook`);
  };

  const handleAppName = (e) => {
    setConfirmAppname(e.target.value);
    if (openDeleteAlert && e.target.value === appDetail.name) {
      setDisableDelete(false);
    } else if (openDeleteAlert && e.target.value !== appDetail.name) {
      setDisableDelete(true);
    }
  };

  // Alerts
  const showDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };
  const showDomainModal = () => {
    setDomainModal(true);
  };
  const showDisableModal = () => {
    setShowAppDisableModal(true);
  };
  const showAppRevisionModal = (revisionId) => {
    setRevisionId(revisionId);
    setRollBackConfirmationModal(true);
    setRevisingAppError("");
  };
  const hideAppRevisionModal = () => {
    setRollBackConfirmationModal(false);
  };

  // Toggles
  const togglePrivateImage = () => {
    setIsPrivateImage((prevIsPrivateImage) => !prevIsPrivateImage);
  };
  const toggleCustomDomain = () => {
    setIsCustomDomain((prevIsCustomDomain) => !prevIsCustomDomain);
  };

  return (
    <DashboardLayout name={appDetail?.name} header="Application Settings" short>
      <div className="SettingsContainer">
        {parentProject === "" ? (
          <div className="LoadingArea">
            <Spinner size="big" />
          </div>
        ) : (
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
                                  className="settings-input"
                                  required
                                  placeholder={appDetail?.image}
                                  name="newImage"
                                  value={newImage ? newImage : appDetail?.image}
                                  onChange={handleImageChange}
                                />
                              </div>
                            </div>

                            <div className="APPButtonRow">
                              <div className="AppLabel">Replicas</div>
                              <div className="flexa">
                                <div className="ReplicasSelect">
                                  <Select
                                    className="settings-input"
                                    placeholder={
                                      "App has " +
                                      appDetail?.replicas +
                                      " replica(s)"
                                    }
                                    options={replicaOptions}
                                    onChange={(selectedOption) =>
                                      handleSelectReplicas(selectedOption)
                                    }
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
                                    <div className="APPButtonRowName">
                                      <div className="AppLabel">Username</div>
                                      <div className="flexa">
                                        <BlackInputText
                                          required
                                          className="sub-input"
                                          placeholder={
                                            app?.username
                                              ? app?.username
                                              : "Username"
                                          }
                                          name="username"
                                          onChange={(e) => {
                                            handleDockerCredentialsChange(e);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="APPButtonRowEmail">
                                      <div className="AppLabel">Email</div>
                                      <div className="flexa">
                                        <BlackInputText
                                          required
                                          className="sub-input-email"
                                          placeholder={
                                            app.email ? app.email : "Email"
                                          }
                                          name="email"
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
                                          className="sub-input"
                                          placeholder={
                                            app.password
                                              ? app.password
                                              : "Password"
                                          }
                                          name="password"
                                          onChange={(e) => {
                                            handleDockerCredentialsChange(e);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="APPButtonRowRegistry">
                                      <div className="AppLabel">
                                        Registry Server
                                      </div>
                                      <div className="flexa">
                                        <BlackInputText
                                          required
                                          className="sub-input"
                                          placeholder="Registry Server"
                                          name="server"
                                          onChange={(e) => {
                                            handleDockerCredentialsChange(e);
                                          }}
                                        />
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

                            <div className="APPButton">
                              <div className="UpperSection">
                                <PrimaryButton
                                  disabled={isUpdating}
                                  className={isUpdating && "deactivatedBtn"}
                                  onClick={handleImageSectionSubmit}
                                >
                                  {isUpdating ? <Spinner /> : "Update"}
                                </PrimaryButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === "Environment and Ports" && (
                      <div className={`APPInstructions BigCard`}>
                        <div className="cardSectionTitle">
                          Environment Variables
                        </div>

                        {envVars !== null &&
                          Object.keys(envVars).map((envVar, index) => (
                            <div key={uuidv4()}>
                              <div className="EnvInputItem">
                                <div className="VarInputGroup">
                                  <BlackInputText
                                    placeholder="Key"
                                    value={envVar}
                                    className="settings-input name-input"
                                    readOnly={true}
                                  />
                                  <BlackInputText
                                    placeholder="Value"
                                    name="varValue"
                                    value={envVars[envVar]}
                                    className="settings-input value-input"
                                    style={{ flex: 1 }}
                                    readOnly={true}
                                  />
                                </div>
                                <div className="EnvVarsAddBtn">
                                  <PrimaryButton
                                    onClick={() => removeExistingEnvVar(index)}
                                    color="red"
                                    small
                                  >
                                    Remove
                                  </PrimaryButton>
                                </div>
                              </div>
                            </div>
                          ))}

                        <div className="EnvInputItem">
                          <div className="VarInputGroup">
                            <BlackInputText
                              placeholder="Key"
                              name="varName"
                              value={varName}
                              className="settings-input name-input"
                              onChange={handleEnvChange}
                              onFocus={() => setEnvError("")}
                            />
                            <BlackInputText
                              placeholder="Value"
                              name="varValue"
                              value={varValue}
                              className="settings-input value-input"
                              style={{ flex: 1 }}
                              onChange={handleEnvChange}
                              onFocus={() => setEnvError("")}
                            />
                          </div>
                          <div className="EnvVarsAddBtn">
                            <PrimaryButton
                              onClick={addEnvVar}
                              color="primary"
                              small
                            >
                              Add
                            </PrimaryButton>
                          </div>
                        </div>

                        {envError && (
                          <div className="errorCenterDiv">
                            <Feedback type="error" message={envError} />
                          </div>
                        )}

                        <hr className="SectionSplit" />

                        <div className="cardSectionTitle">
                          Port and Entry Commands
                        </div>
                        <div className="Environments">
                          <div className="PortSection">
                            <div>Port</div>
                            <div className="commandInputSection">
                              <div className="flexa">
                                <BlackInputText
                                  type="text"
                                  placeholder="Port"
                                  name="port"
                                  value={appDetail.port ? appDetail.port : port}
                                  className="portInput"
                                  onChange={handleEnvChange}
                                  onFocus={() => {
                                    setPortError("");
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="PortSection">
                            <div>Entry Command</div>
                            <div className="commandInputSection">
                              <div className="flexa">
                                <BlackInputText
                                  type="text"
                                  placeholder="Entry Command"
                                  name="entryCommand"
                                  value={
                                    appDetail.command
                                      ? appDetail.command
                                      : entryCommand
                                  }
                                  className="portInput"
                                  onChange={handleEnvChange}
                                  onFocus={() => {
                                    setCommandError("");
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {commandError && (
                          <div className="errorCenterDiv">
                            <Feedback type="error" message={commandError} />
                          </div>
                        )}

                        {portError && (
                          <div className="errorCenterDiv">
                            <Feedback type="error" message={portError} />
                          </div>
                        )}

                        <div className="APPButton">
                          <div className="UpperSection">
                            <PrimaryButton
                              // className={isUpdating && "deactivatedBtn"}
                              onClick={() => handleEnvSubmit()}
                            >
                              {isUpdating ? <Spinner /> : "Update"}
                            </PrimaryButton>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "Domain and URLs" && (
                      <div className={`APPInstructions BigCard`}>
                        <div className="APPButtonRow">
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
                                  // onClick={() => {
                                  //   regenerate();
                                  // }}
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
                        </div>

                        {loggedInUser.data.beta && (
                          <div className="APPButtonRow">
                            <div className="AppLabel">Custom Domain</div>
                            <Checkbox
                              isBlack
                              onClick={toggleCustomDomain}
                              isChecked={isCustomDomain}
                            />
                          </div>
                        )}

                        {isCustomDomain && (
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
                                      className="domain-input"
                                      placeholder="Domain name"
                                      name="domainName"
                                      value={domainName.toLowerCase()}
                                      // onChange={(e) => {
                                      //   handleChange(e);
                                      // }}
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
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="APPButton">
                          <div className="UpperSection">
                            <PrimaryButton
                              disabled={isUpdating}
                              className={isUpdating && "deactivatedBtn"}
                              //onClick={this.handleSubmit}
                            >
                              {isUpdating && updating_form ? (
                                <Spinner />
                              ) : (
                                "Update"
                              )}
                            </PrimaryButton>
                          </div>
                        </div>

                        {isCustomDomain && (
                          <>
                            <hr className="SectionSplit" />
                            <div className="RevertSection">
                              <div className="FlexRevertSection">
                                <div>
                                  <strong>Revert to URL</strong>
                                </div>
                                <div>
                                  Reverts to cranecloud's auto-generated URL.
                                </div>
                              </div>
                              <div className="SectionButtons">
                                <PrimaryButton
                                  className="RevertButton"
                                  //onClick={domainRevert}
                                  disabled={urlReverted}
                                >
                                  {isReverting ? <Spinner /> : "Revert"}
                                </PrimaryButton>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="APPSections">
                <div className="SectionTitle">Application Revisions</div>
                <div className={`AppRevisionsDetails BigCard`}>
                  {revisions.length === 0 ? (
                    <div className="ResourceSpinnerWrapper">
                      <Spinner size="big" />
                    </div>
                  ) : (
                    [...revisions]
                      .sort((a, b) =>
                        a.current === b.current ? 0 : a.current ? -1 : 1
                      )
                      .map((entry, index) => (
                        <div
                          key={entry.revision_id}
                          className={`version-item ${
                            entry.current ? "current" : ""
                          }`}
                        >
                          <div className="version-details">
                            <span className="upload-icon">
                              <Upload className="Success" />
                            </span>
                            <div className="version-header">
                              <div className="version-name">{entry.image}</div>
                              <div className="version-id">
                                {entry.revision_id}
                              </div>
                            </div>
                          </div>
                          <div className="version-date">
                            {DisplayDateTime(new Date(entry.created_at))}
                          </div>
                          {!entry.current ? (
                            <div
                              className="rollback-link"
                              onClick={() =>
                                showAppRevisionModal(entry.revision_id)
                              }
                            >
                              Rollback here
                            </div>
                          ) : (
                            <span className="current-label">Current</span>
                          )}
                        </div>
                      ))
                  )}
                  {/* <div className="pagination">
                    <div className="rollback-link">Previous</div>
                    <div className="rollback-link">Next</div>
                  </div> */}
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
                              : "This will prevent your app from being billed by blocking access to it's resources."}
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

                        {message !== "" && (
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
                    onClickAway={() => setOpenDeleteAlert(false)}
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
                              placeholder={appDetail.name}
                              name="ConfirmAppname"
                              value={ConfirmAppname}
                              onChange={handleAppName}
                            />
                            <DeleteWarning textAlignment="Left" />
                          </div>
                        </div>
                      </div>

                      <div className="DeleteModalLowerSection">
                        <div className="DeleteAppModelButtons">
                          <PrimaryButton
                            className="CancelBtn"
                            onClick={() => setOpenDeleteAlert(false)}
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
                  <Modal
                    showModal={domainModal}
                    onClickAway={() => setDomainModal(false)}
                  >
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
                          <button onClick={() => setDomainModal(false)}>
                            OK
                          </button>
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
