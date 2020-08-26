import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InformationBar from '../InformationBar';
import Header from '../Header';
import Spinner from '../Spinner';
import SideBar from '../SideBar';
import './ProjectMemoryPage.css';
import getProjectMemory from '../../redux/actions/projectMemory';
import { clearProjectMemory } from '../../redux/actions/projectMemory';
import MetricsCard from '../MetricsCard';
import PeriodSelector from '../Period';
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

class ProjectMemoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { match: { params }, getProjectMemory, clearProjectMemory } = this.props;
    const { projectID } = params;
    clearProjectMemory();
    getProjectMemory(projectID, {});
  }

  render() {
    const {
      match: { params },
      metrics
    } = this.props;

    console.log(metrics);
    const { name } = this.props.location;
    const { appID } = params;

    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={name}
              params={params}
              pageRoute={this.props.location.pathname} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header="Memory"
              />
            </div>
            <div className="ContentSection">
              <MetricsCard className="MetricsCardGraph" title={<PeriodSelector onChange={() => {}} />}>
                <LineChartComponent yLabel="Memory(bytes)" xLabel="Time" lineDataKey="uv" data={shuffle(sampleData)} />
              </MetricsCard>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

ProjectMemoryPage.propTypes = {

};

ProjectMemoryPage.defaultProps = {

};

const mapStateToProps = (state) => {
  const { isFetching, metrics, message: metricsMessage } = state.projectMemoryReducer;
  return {
    isFetching,
    metrics,
    metricsMessage
  };
};

const mapDispatchToProps = {
  getProjectMemory,
  clearProjectMemory
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMemoryPage);
