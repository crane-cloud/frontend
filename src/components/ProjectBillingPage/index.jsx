import React ,{ PureComponent }from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../Header";
import SideBar from "../SideBar";
import InformationBar from "../InformationBar";
import PrimaryButton from "../../components/PrimaryButton";
import { PieChart, 
    Pie,  
    Cell,
    BarChart,
    Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend,
     ResponsiveContainer
} from 'recharts';
import  styles from  "./ProjectBillingPage.module.css";

const data = [
    { name: 'CPU / $1 per 1K seconds', value: 400, color:'#0088FE' },
    { name: 'RAM / $4 per GB', value: 300, color:'#00C49F'},
    { name: 'Network / $1 per request', value: 300, color:'#FFBB28' },
    { name: 'Storage/ $1 per GB', value: 200, color:'#FF8042' },
    {name:  'Database/ $1 per GB', value: 67, color:'#99D2E9' },
  ];
  const data2 = [
    {name: 'Aug', amount: 1398},
    {name: 'Sept', amount: 9800},
    {name: 'Oct',amount: 3908},
    {name: 'Nov',amount: 4800},
    {name: 'Dec',amount: 3800},
    {name: 'Jan',amount: 1267},
  ];
 

class ProjectBillingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
     
    };

    this.getProjectName = this.getProjectName.bind(this);
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

  
 
  render() {
    const {
      match: { params },
    } = this.props;
    const { projectID } = params;


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
          <div className>
              <InformationBar header="Project Billing" />
          </div>
            <div className= {styles.SmallContainer}> 
           <div className={styles.OuterContainerBorder}>
               <div className={styles.DonutChatContainer}>
                 <div className={styles.InsideHeading}>
                    <h className={styles.Heading}>
                        Month-to date Summary</h>
                 </div>
                 <div className={styles.Subtext}>
                 The chart below shows the proportion of costs spent 
                 for each service you use on the platform
                 </div>
                 <div className={styles.DonutChat}>
                 <PieChart width={150} height={130} onMouseEnter={this.onPieEnter}>
                <Pie
                     data={data}
                     cx={70}
                     cy={60}
                    innerRadius={30}
                    outerRadius={50}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                 >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={data[(index % data.length)].color} />
                 ))}
                </Pie>
                 </PieChart>
              </div>
                <div className={styles.MonthSummary}>
                {data.map((entry, index) => (
                    <div className={styles.ResourseDetail}>
                    <div className={styles.Cube} style={{background: `${data[(index % data.length)].color}` }}/>
                    <div className={styles.ResourceName}>
                    {data[(index % data.length)].name}  
                    </div>
                    <div className={styles.ResourcePrice}>
                     ${data[(index % data.length)].value}
                    </div>
                   </div>
                 ))}
                 <div className={styles.Total}>
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
               <vl className={styles.hr}/>
               <div className={styles.BarGraphContainer}>
               <div className={styles.InsideHeading}>
                    <h className={styles.Heading}>
                    Spending Summary</h>
                </div>
                <div className={styles.Subtext}>
                Your spending summary for the last three months appears below
                 </div>
                 <div className={styles.Subtext2}>
                  Current Month-to-Date balance is  ${this.findSum()}
                 </div>
                 <ResponsiveContainer width="100%" height="80%">
                 <BarChart
                    width={200}
                    height={200}
                    data={data2}
                    margin={{
                     top: 5,
                     right: 30,
                     left: 20,
                     bottom: 5,
                    }}
                  barSize={30}
              >
                   <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                   <YAxis />
                   <Tooltip />
                    <Legend />
                   <CartesianGrid strokeDasharray="3 3" />
                   <Bar dataKey="amount" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
                </ResponsiveContainer>
              
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
      userID: PropTypes.string.isRequired,
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
