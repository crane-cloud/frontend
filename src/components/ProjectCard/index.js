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

  formatMetrics(metricsArray) {
    const memoryData = [];
    metricsArray.forEach((metric) => {
      const newMetricObject = {
        time: this.translateTimestamp(metric.timestamp),
        memory: metric.value
      };

      memoryData.push(newMetricObject);
    });

    return memoryData;
  }

  render() {
    const {
      name,
      data,
      description,
      cardID,
      metrics
    } = this.props;
    const formattedMetrics = this.formatMetrics(metrics);
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
  getProjectMemory: PropTypes.func.isRequired
};

ProjectCard.defaultProps = {
  name: '',
  description: ''
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  const { isFetching, metrics, message } = state.projectMemoryReducer;
  return {
    data,
    isFetching,
    metrics,
    message
  };
};

const mapDispatchToProps = {
  getProjectMemory
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
