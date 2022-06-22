import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProjectCard.css";
import LineChartComponent from "../LineChart";
import getProjectMemory from "../../redux/actions/projectMemory";
import { formatMemoryMetrics } from "../../helpers/formatMetrics";

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
    const { name, description, cardID,apps_count } = this.props;

    const formattedMetrics = this.getProjectMemoryMetrics();

    return (
      <>
        <div className="ProjectsCard">
          <div className="appCount">{apps_count}</div>
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
          <div className="BottomContainer">
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
