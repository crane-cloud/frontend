import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProjectCard.css";
import LineChartComponent from "../LineChart";
import getProjectMemory from "../../redux/actions/projectMemory";
import { formatMemoryMetrics } from "../../helpers/formatMetrics";
import { ReactComponent as Users } from "../../assets/images/users.svg";

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);

    this.getProjectMemoryMetrics = this.getProjectMemoryMetrics.bind(this);
  }

  componentDidMount() {
    const { cardID, getProjectMemory } = this.props;
    getProjectMemory(cardID, {});
  }

  getProjectMemoryMetrics() {
    const { cardID } = this.props;
    const { memoryMetrics } = this.props;
    const results = formatMemoryMetrics(cardID, memoryMetrics);
    return results;
  }

  render() {
    const { name, description, cardID,apps_count,userID,acceptInviteCallBackModel,ownerId } = this.props;

    const formattedMetrics = this.getProjectMemoryMetrics();

    return (
      <>
        <div className="ProjectsCard">
          <div className="appCount" title={`${apps_count} Apps in this project`}>{apps_count}</div>
          {/**Check if user is part of the project or 
           * any implementation */}
          {userID !=="user"?
          (<Link
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
          </Link>):
          <div 
          onClick={()=>{acceptInviteCallBackModel()}}
          className="PendingNote">
             Invitation to this project is pending acceptance
          </div>
          }
          <div className="BottomContainer">
            <div className="ProjectInfor">
            <div className="ProjectInfoSection">
              <Link
                to={{
                  pathname: `/projects/${cardID}/dashboard`,
                  projectData: name,
                }}
                key={cardID}
              >
                <div className="ProjectsCardName">{name}</div>
              </Link>
            </div>
            <div className="ProjectDescription">{description}</div>
            </div>
            {/* conditional for when the user project its shared */}
            {userID !== ownerId &&
              <Users title="This is a shared project"/>
            }
          </div>
        </div>
      </>
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
