import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./ProjectCard.css";
import LineChartComponent from "../LineChart";
import { formatMemoryMetrics } from "../../helpers/formatMetrics";
import { handleGetRequest } from "../../apis/apis.js";
import { ReactComponent as AlertWarning } from "../../assets/images/alert.svg";
import Spinner from "../Spinner";
import getProjectMemory from "../../redux/actions/projectMemory";
import { ReactComponent as ProjectMembers } from "../../assets/images/project-members.svg";
import { ReactComponent as Deployments } from "../../assets/images/deployments.svg";
import {formatCount} from "../../helpers/counterFormat.js"

const ProjectCard = ({
  cardID,
  name = "",
  description = "",
  apps_count,
  followers_count,
  userID,
  acceptInviteCallBackModel,
  ownerId,
  disabled,
  admin_disabled,
}) => {
  const [projectMembers, setProjectMembers] = useState([]);
  const [fetchMembersError, setFetchMembersError] = useState("");
  const [currentUserRecord, setCurrentUserRecord] = useState({});
  const [fetchingProjectMembers, setFetchingProjectMembers] = useState(true);
  const [formattedMetrics, setFormattedMetrics] = useState([]);

  const dispatch = useDispatch();
  const memoryMetrics = useSelector(
    (state) => state.projectMemoryReducer.memoryMetrics
  );

  useEffect(() => {
    dispatch(getProjectMemory(cardID, {}));
    getProjectMembers();
  }, [cardID, dispatch]);

  useEffect(() => {
    if (memoryMetrics) {
      setFormattedMetrics(formatMemoryMetrics(cardID, memoryMetrics));
    }
  }, [memoryMetrics, cardID]);

  const getProjectMembers = () => {
    handleGetRequest(`/projects/${cardID}/users`)
      .then((response) => {
        setProjectMembers(response.data.data.project_users);
        setFetchingProjectMembers(false);
        getCurrentUserRecord(response.data.data.project_users);
      })
      .catch(() => {
        setFetchMembersError("Failed to fetch project members");
        setFetchingProjectMembers(false);
      });
  };

  const getCurrentUserRecord = (members) => {
    const userRecord = members?.find((item) => item.user?.id === userID);
    setCurrentUserRecord(userRecord || {});
  };

  const updateRoleValue = (string) => {
    let role = string[1];
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div
      className={`ProjectsCard ${admin_disabled ? "unclickable" : ""} ${
        disabled || admin_disabled ? "opequeCard" : ""
      }`}
      title={
        disabled === true && !admin_disabled
          ? "Disabled project"
          : admin_disabled
          ? "Admin disabled this project"
          : name
      }
    >
      <div className="appCount" >
        <div className="countAndIcon">
          <ProjectMembers
            className={"membersIcon"}
            title={"Project followers"}
          />
          <span className={"memberCount"}>{formatCount(followers_count)}</span>
        </div>
        <div className="countAndIcon">
          <Deployments
            className={"membersIcon"}
            title={"Project apps"}
          />
          <span className={"memberCount"}>{formatCount(apps_count)}</span>
        </div>
      </div>
      {userID === ownerId ||
      currentUserRecord?.accepted_collaboration_invite ? (
        <Link
          to={{
            pathname: `/projects/${cardID}/dashboard`,
            projectData: name,
          }}
          className={`${admin_disabled ? "killPointerActions" : ""}`}
          key={cardID}
        >
          <div className="ProjectImageDiv">
            <LineChartComponent
              lineDataKey="memory"
              preview
              data={formattedMetrics}
            />
          </div>
        </Link>
      ) : (
        <div
          onClick={() => {
            acceptInviteCallBackModel(
              cardID,
              updateRoleValue(currentUserRecord.role.split("."))
            );
          }}
          className="PendingNote"
        >
          {fetchingProjectMembers ? (
            <Spinner />
          ) : (
            `Invitation to this project is pending acceptance`
          )}
        </div>
      )}
      <div className="ProjectBottomContainer">
        <div className="ProjectInfor">
          <div className="ProjectInfoSection">
            <Link
              to={
                userID === ownerId ||
                currentUserRecord?.accepted_collaboration_invite
                  ? {
                      pathname: `/projects/${cardID}/dashboard`,
                      projectData: name,
                    }
                  : null
              }
              className={`${admin_disabled ? "killPointerActions" : ""}`}
              onClick={() => {
                acceptInviteCallBackModel(
                  cardID,
                  updateRoleValue(currentUserRecord.role.split("."))
                );
              }}
              key={cardID}
            >
              <div className={`ProjectsCardName`}>{name}</div>
            </Link>
            {admin_disabled && (
              <div className="AlertIcon" title="Project disabled by Admin">
                <AlertWarning />
              </div>
            )}
          </div>
          <div className="ProjectDescription">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
