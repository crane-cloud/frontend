import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProjectCard.css";
import LineChartComponent from "../LineChart";
import getProjectMemory from "../../redux/actions/projectMemory";
import { formatMemoryMetrics } from "../../helpers/formatMetrics";
import { handleGetRequest } from "../../apis/apis.js";
import Spinner from "../Spinner";

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projecMembers: [],
      fetchMembersError: "",
      currentUserRecord: {},
      fetchingProjectMembers: true,
    };
    this.getProjectMemoryMetrics = this.getProjectMemoryMetrics.bind(this);
    this.getProjectMemberz = this.getProjectMemberz.bind(this);
    this.getcurrentUserRecord = this.getcurrentUserRecord.bind(this);
    this.updateRoleValue = this.updateRoleValue.bind(this);
  }

  componentDidMount() {
    const { cardID, getProjectMemory } = this.props;
    getProjectMemory(cardID, {});
    this.getProjectMemberz();
  }

  getProjectMemoryMetrics() {
    const { cardID } = this.props;
    const { memoryMetrics } = this.props;
    const results = formatMemoryMetrics(cardID, memoryMetrics);
    return results;
  }
  getProjectMemberz() {
    const { cardID } = this.props;
    handleGetRequest(`/projects/${cardID}/users`)
      .then((response) => {
        this.setState({
          projecMembers: response.data.data.project_users,
          fetchingProjectMembers: false,
        });
        this.getcurrentUserRecord();
      })
      .catch((error) => {
        this.setState({
          fetchMembersError: "Failed to fetch project members",
          fetchingProjectMembers: false,
        });
      });
  }
  getcurrentUserRecord() {
    const { userID } = this.props;
    const { projecMembers } = this.state;
    //one object should be returned.
    this.setState({
      currentUserRecord: projecMembers?.filter(
        (item) => item.user?.id === userID
      ),
    });
  }
  updateRoleValue(string) {
    let role = string[1];
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
  render() {
    const {
      name,
      description,
      cardID,
      apps_count,
      userID,
      acceptInviteCallBackModel,
      ownerId,
    } = this.props;
    const { currentUserRecord, fetchingProjectMembers } = this.state;
    const formattedMetrics = this.getProjectMemoryMetrics();
    return (
      <div className="ProjectsCard">
        <div className="appCount" title={`${apps_count} Apps in this project`}>
          <div>{apps_count}</div>
        </div>
        {/**Check if user is not owner and invitation status */}
        {userID === ownerId ||
        currentUserRecord[0]?.accepted_collaboration_invite === true ? (
          <Link
            to={{
              pathname: `/projects/${cardID}/dashboard`,
              projectData: name,
            }}
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
                this.updateRoleValue(currentUserRecord[0].role.split("."))
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
                  currentUserRecord[0]?.accepted_collaboration_invite === true
                    ? {
                        pathname: `/projects/${cardID}/dashboard`,
                        projectData: name,
                      }
                    : null
                }
                onClick={() => {
                  acceptInviteCallBackModel(
                    cardID,
                    this.updateRoleValue(currentUserRecord[0].role.split("."))
                  );
                }}
                key={cardID}
              >
                <div className="ProjectsCardName">{name}</div>
              </Link>
            </div>
            <div className="ProjectDescription">{description}</div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  cardID: PropTypes.string.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  getProjectMemory: PropTypes.func.isRequired,
  memoryMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ProjectCard.defaultProps = {
  name: "",
  description: "",
};

export const mapStateToProps = (state) => {
  const { isFetchingMemory, memoryMetrics, memoryMessage } =
    state.projectMemoryReducer;
  return {
    isFetchingMemory,
    memoryMetrics,
    memoryMessage,
  };
};

const mapDispatchToProps = {
  getProjectMemory,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
