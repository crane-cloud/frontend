import React from "react";
// import { Link } from "react-router-dom";
// import moment from "moment";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import PrimaryButton from "../../components/PrimaryButton";
import styles from "./ProjectLogs.module.css";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
import { ReactComponent as Upload } from "../../assets/images/upload-cloud(1).svg";
import { ReactComponent as Trash } from "../../assets/images/trash-2.svg";
import { ReactComponent as Startup } from "../../assets/images/trending-up.svg";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
// import axios from "axios";
// import Spinner from "../Spinner";

const ProjectLogs = (props) => {
  const { projects } = useSelector((state) => state.userProjectsReducer);
  const { data } = useSelector((state) => state.user);
  const { projectID } = useParams();
  const getProjectName = (id) => {
    return projects?.find((project) => project.id === id).name;
  };
  // const handleConversion = () => {
  //   axios
  //     .get(LIVE_EXCHANGE_RATE_API)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         return false;
  //       }
  //       setRate(response.data.rates.UGX);
  //     })
  //     .catch((e) => {
  //       //failed to load current rate
  //       setInUgx(false);
  //     });
  // };
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
      <div className={styles.Table}>
        <div className={styles.TableRow}>
          <CheckMark className={styles.Success} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>{data.email}</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Creating application{" "}
                <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.LastCell}>
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
        <hr className={styles.hr} />
      </div>
    </DashboardLayout>
  );
};
export default ProjectLogs;
