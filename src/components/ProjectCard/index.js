import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProjectCard.css';
import LineChartComponent from '../LineChart';
import getProjectMemory from '../../redux/actions/projectMemory';

class ProjectCard extends React.Component {
  componentDidMount() {
    const { cardID, getProjectMemory } = this.props;
    getProjectMemory(cardID, {});
  }

  translateTimestamp(timestamp) {
    const timestampMillisecond = timestamp * 1000; // convert timestamp to milliseconds
    const dateObject = new Date(timestampMillisecond); // create a date object out of milliseconds
    return dateObject.toLocaleString();
  }

  formatMetrics(projectID) {
    const { memoryMetrics } = this.props;
    const found = memoryMetrics.find((metric) => metric.project === projectID);
    const memoryData = [];

    if (found !== undefined) {
      if (found.metrics.length > 0) {
        found.metrics.forEach((metric) => {
          const newMetricObject = {
            time: this.translateTimestamp(metric.timestamp),
            memory: metric.value
          };

          memoryData.push(newMetricObject);
        });
      } else {
        memoryData.push({ time: 0, memory: 0 });
        memoryData.push({ time: 0, memory: 0 });
      }
    }
    return memoryData;
  }

  render() {
    const {
      name,
      data,
      description,
      cardID
    } = this.props;

    const formattedMetrics = this.formatMetrics(cardID);

    const userId = data.id;
    
    return (
      <>
        <div className="ProjectsCard">
          <Link to={{ pathname: `/users/${userId}/projects/${cardID}/apps`, projectData: name }} key={cardID}>
            <div className="ProjectImageDiv">
              <LineChartComponent lineDataKey="memory" preview data={formattedMetrics} />
            </div>
          </Link>
          <div className="BottomContainer">
            <div className="ProjectInfoSection">
              <Link to={{ pathname: `/users/${userId}/projects/${cardID}/apps`, projectData: name }} key={cardID}>
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
  data: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  getProjectMemory: PropTypes.func.isRequired,
  memoryMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

ProjectCard.defaultProps = {
  name: '',
  description: ''
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  const { isFetchingMemory, memoryMetrics, memoryMessage } = state.projectMemoryReducer;
  return {
    data,
    isFetchingMemory,
    memoryMetrics,
    memoryMessage
  };
};

const mapDispatchToProps = {
  getProjectMemory
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
