import React ,{ PureComponent }from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../Header";
import SideBar from "../SideBar";
import InformationBar from "../InformationBar";
import PrimaryButton from "../PrimaryButton";
import DonutChart from "../DonutChart";
import BarGraph from "../BarGraph";
import MetricsCard from "../MetricsCard";
import SpendingPeriod from "../SpendingPeriod";
import  styles from  "./ProjectBillingPage.module.css";

const data = [
    { name: 'CPU / $1 per 1K seconds', value: 400, color:'#0088FE' },
    { name: 'RAM / $4 per GB', value: 300, color:'#00C49F'},
    { name: 'Network / $1 per request', value: 300, color:'#FFBB28' },
    { name: 'Storage/ $1 per GB', value: 200, color:'#FF8042' },
    {name:  'Database/ $1 per GB', value: 67, color:'#99D2E9' },
  ];
  const data2 = [
    {date: '2021-08', amount: 1398},
    {date: '2021-09', amount: 9800},
    {date: '2021-10',amount: 3908},
    {date: '2021-11',amount: 4800},
    {date: '2021-12',amount: 3800},
    {date: '2022-01',amount: 1267},
    {date: '2022-02',amount: 1267},
  ];
 

class ProjectBillingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        time: {
          start: 0,
          end: 0,
        },
        period: "5m",
        months: data2
    };
    this.getProjectName = this.getProjectName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.findSum = this.findSum.bind(this);
  }

  componentDidMount() {
   
  }

  getProjectName(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).name;
  }
  findSum(){
      var sum = 0;
      for(var i =0; i < data.length ; i++){
        sum += data[i].value;
      }
      return sum;
  }
  async handlePeriodChange(period, customTime = null) {
    this.setState({ period }); 
    let startTimeStamp;
    let endTimeStamp = new Date();
   
    if (period === "5m") {
       startTimeStamp = new Date(endTimeStamp.setMonth(endTimeStamp.getMonth() - 5))
       endTimeStamp = new Date();
       let newMonths = [];
       for(var i=0; i<data2.length; i++){ 
        if( new Date(data2[i].date).getTime()>=startTimeStamp.getTime()){
           newMonths.push(data2[i])
        }  
       }
      
      this.setState({ months: newMonths })
    } 
    if (period === "all") {
      // get all months
      this.setState({months: data2});

    } else if (period === "custom" && customTime !== null) {
      startTimeStamp = customTime.start;
      endTimeStamp = customTime.end;
      let newMonths = [];
      for(var n=0; n<data2.length; n++){ 
       if( new Date(data2[n].date).getTime()>=new Date(startTimeStamp).getTime()  &&
       new Date(data2[n].date).getTime()<=new Date(endTimeStamp).getTime()){
          newMonths.push(data2[n])
       }  
      }
     this.setState({ months: newMonths })
    }
    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        end: endTimeStamp,
        start: startTimeStamp,
      },
    }));

     
  }

  render() {
    const {
      match: { params },
    } = this.props;
    const { projectID } = params;

    const {
      months
    } = this.state;

    return (
     
      <div className={styles.Page}>
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
            <SideBar
              name={this.getProjectName(projectID)}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/projects/${projectID}/metrics`}
              cpuLink={`/projects/${projectID}/cpu/`}
              memoryLink={`/projects/${projectID}/memory/`}
              databaseLink={`/projects/${projectID}/databases`}
              networkLink={`/projects/${projectID}/network/`}
            />
          </div>
          <div className={styles.MainContentSection}>
          <div  >
              <InformationBar header="Project Billing" />
          </div>
            <div className= {styles.SmallContainer}> 
           <div className={styles.OuterContainerBorder}>
               <div className={styles.DonutChatContainer}>
                 <div className={styles.InsideHeading}>
                    <div className={styles.Heading}>
                        Month-to date Summary</div>
                 </div>
                 <div className={styles.Subtext}>
                 The chart below shows the proportion of costs spent 
                 for each service you use on the platform
                 </div>
                 <DonutChart 
                 center_x={60}
                 center_y={70}
                InnerRadius={30}
                OuterRadius={50}
                data={data}
                height={150}
                width={130}
                 />
                
                <div className={styles.MonthSummary}>
                {data.map((entry, index) => (
                    <div className={styles.ResourseDetail} key={index} >
                    <div className={styles.Cube} style={{background: `${data[(index % data.length)].color}` }}/>
                    <div className={styles.ResourceName}>
                    {data[(index % data.length)].name}  
                    </div>
                    <div className={styles.ResourcePrice}>
                     ${data[(index % data.length)].value}
                    </div>
                   </div>
                 ))}
                 <div className={styles.Total} >
                   <div className={styles.TotalTxt}>
                      Total
                   </div>
                   <div className={styles.ResourcePrice}>
                     ${this.findSum()}
                   </div>
               </div>
               </div>
               <div className={styles.paymentButton}>
               <PrimaryButton label={"Pay Bill"}/>
              </div>
               
               </div>
               <div className={styles.hr}></div> 
               <div className={styles.BarGraphContainer}>
               <div className={styles.InsideHeading}>
                    <div className={styles.Heading}>
                    Spending Summary</div>
                </div>
                <div className={styles.Subtext}>
                Your spending summary for the last three months appears below
                 </div>
                 <div className={styles.Subtext2}>
                  Current Month-to-Date balance is  ${this.findSum()}
                 </div>
                 <div className={styles.MetricContainer}>
                 <MetricsCard
                className={styles.MetricsCardGraph}
                title={<SpendingPeriod  onChange={this.handlePeriodChange} />}
                 >
                 <BarGraph data={months} height={180} width={200}  barSize={30} 
                 width_percentage="100%" height_percentage="80%" />
                 </MetricsCard>
                 </div>
               </div>      
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectBillingPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  return {
    projects,

  };
};

const mapDispatchToProps = {
 
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBillingPage);
