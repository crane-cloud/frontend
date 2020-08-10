import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProjectCard.css';
import LineChartComponent from '../LineChart';

const sampleData = [
  { name: 'Sample Metric 1', uv: 250 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 10 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 70 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 60 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 190 },
  { name: 'Sample Metric 2', uv: 290 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 130 },
  { name: 'Sample Metric 2', uv: 0 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 280 },
  { name: 'Sample Metric 2', uv: 300 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 170 },
  { name: 'Sample Metric 2', uv: 290 },
];

// this function is meant to shuffle the dummy data array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    const { name, description } = props;
    this.state = {
      projectName: name ? props.name : '',
      projectDescription: description ? props.description : '',
      error: ''
    };

    this.container = React.createRef();
  }

  render() {
    const {
      name, data, description, cardID
    } = this.props;
    const userId = data.id;

    return (
      <>
        <div className="ProjectsCard">
          <Link to={{ pathname: `/users/${userId}/projects/${cardID}/apps`, projectData: name }} key={cardID}>
            <div className="ProjectImageDiv">
              <LineChartComponent data={shuffle(sampleData)} />
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
  }).isRequired
};

ProjectCard.defaultProps = {
  name: '',
  description: ''
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  return {
    data,
  };
};

export default connect(mapStateToProps)(ProjectCard);
