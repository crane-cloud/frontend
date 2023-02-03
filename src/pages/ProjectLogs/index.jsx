import React from "react";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import PrimaryButton from "../../components/PrimaryButton";
import styles from "./ProjectLogs.module.css";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
// import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
// import { ReactComponent as Upload } from "../../assets/images/upload-cloud(1).svg";
// import { ReactComponent as Trash } from "../../assets/images/trash-2.svg";
// import { ReactComponent as Startup } from "../../assets/images/trending-up.svg";
import { handleGetRequest } from "../../apis/apis.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { DisplayDateTime } from "../../helpers/dateConstants";

const ProjectLogs = (props) => {
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState([])
  const [feedback, setFeedback] = useState("")
  const { projects } = useSelector((state) => state.userProjectsReducer);
  const { data } = useSelector((state) => state.user);
  const { projectID } = useParams();

  const getProjectName = (id) => {
    return projects?.find((project) => project.id === id).name;
  };
  useEffect(() => {
    fetchActivityLogs()
  }, []); 

  const fetchActivityLogs = () => {
    setLoading(true)
    //projectID
    handleGetRequest(`/users/activities?a_project_id=${projectID}`)
      .then((response) => { 
        if(response.data.data.activity.length > 0 ){
          setLogs(response.data.data.activity)
        } else {
          setFeedback("No logs for this project")
        }
        setLoading(false)
      })
      .catch((error) => {
        setFeedback("Failed to fetch logs, please try again")
        setLoading(false)
      });
  };

  // const handleEndpointCustomisation = () => {
    
  // };
  // api needs to factor inproject collaboration, (who did what? not only current user)
  // no logs for database creations, app creations and updates, basically only logs 
  // for project creation available


  return (
    <DashboardLayout header="Project Activity" name={getProjectName(projectID)}>
      <div className={styles.Header}>
        <div className={styles.Heading}>Activity Feed</div>
        <div className={styles.SimpleForm}>
          <input
            type="text"
            className={styles.field}
            placeholder=" Filter by Status/Action/User"
          />
          <PrimaryButton className={styles.FilterButton}>Filter</PrimaryButton>
        </div>
      </div>
      <div className="BigCard">{
        loading ? <Spinner/> : 
        feedback !=="" ? 
        <div className={styles.NoResourcesMessage}>
          {feedback}
          </div>:
        logs.map((item,index)=>(
          <div key={index}>
          <div className={styles.TableRow}>
          {item.status==='Success' ? <CheckMark className={styles.Success} />:  
           <Danger className={styles.Danger} />
          }
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.ActivityEmail}>{data.email}:</div>
                <div className={styles.ActivityDate}>{DisplayDateTime(new Date(item.creation_date))}</div>
              </div>
              <div >
                {item.operation}
                <span className={styles.Entity}>{item._id.$oid}</span>{" "}
                <span className={item.status==='Success'? styles.Success: styles.Danger}>
                {item.status}</span>
              </div>
            </div>
            <div className={styles.ActivityDescription}>
              <div>{item.description}</div>
            </div>
          </div>
           </div>
          {index !== (logs.length -1) && <hr className={styles.hr} />}
          </div>
        ))
      }
      {/* comment section below should be kept
       as a guide on how to render different types of logs */}
        {/* <div className={styles.TableRow}>
          <CheckMark className={styles.Success} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.ActivityEmail}>{data.email}:</div>
                <div className={styles.ActivityDate}>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div >
                Creating application{" "}
                <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.ActivityDescription}>
              <div>Successfully created application</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />

        <div className={styles.TableRow}>
          <Danger className={styles.Danger} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.username} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>Muwonge@gmail.com</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Updating project{" "}
                <span className={styles.Entity}>dsesdwe23</span>{" "}
                <span className={styles.Danger}>Failed</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>Project update description failed.</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.TableRow}>
          <CloudOff className={styles.Danger} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>{data.email}</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Deploying app <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Danger}>Failed</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>App deployment has failed.</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.TableRow}>
          <Upload className={styles.Success} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>{data.email}</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Deploying app <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>Successfully deployed application.</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.TableRow}>
          <Trash className={styles.Danger} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>{data.email}</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Deleting app <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>Successfully deleted application.</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.TableRow}>
          <Startup />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>{data.email}</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Create project <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>Created project.</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} /> */}
      </div>
    </DashboardLayout>
  );
};
export default ProjectLogs;
