import React from "react";
import { Link } from "react-router-dom";
// import moment from "moment";
import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import Avatar from "../../components/Avatar";
import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import styles from "./ProjectLogs.module.css";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
import { ReactComponent as Upload } from "../../assets/images/upload-cloud(1).svg";
import { useParams } from "react-router-dom";
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
    <div className={styles.Page}>
      <div className={styles.TopBarSection}>
        <Header />
      </div>
      <div className={styles.MainSection}>
        <div className={styles.SideBarSection}>
          <SideBar
            name={getProjectName(projectID)}
            params={useParams()}
            pageRoute={props.location?.pathname}
            allMetricsLink={`/projects/${projectID}/metrics`}
            cpuLink={`/projects/${projectID}/cpu/`}
            memoryLink={`/projects/${projectID}/memory/`}
            databaseLink={`/projects/${projectID}/databases`}
            networkLink={`/projects/${projectID}/network/`}
          />
        </div>
        <div className={styles.MainContentSection}>
          <div>
            <InformationBar header="Project Activity" />
          </div>
          <div className={styles.SmallContainer}>
            <div className={styles.Header}>
              <div className={styles.Heading}>Activity Feed</div>
              <div className={styles.SimpleForm}>
                <input
                  type="text"
                  className={styles.field}
                  placeholder=" Filter by Status"
                />
                <PrimaryButton label="Filter" className={styles.FilterButton} />
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
                      Creating project{" "}
                      <span className={styles.Entity}>4344ewe23</span>{" "}
                      <span className={styles.Success}>Successful</span>
                    </div>
                  </div>
                  <div className={styles.LastCell}>
                    <div>Successfully updated project description</div>
                  </div>
                </div>
              </div>
              <hr className={styles.hr} />
              <div className={styles.TableRow}>
                <Danger className={styles.Danger} />
                <div className={styles.Row}>
                  <div className={styles.RowCell}>
                    <Avatar name={data.name} className={styles.UserAvatar} />
                    <div>
                      <div className={styles.Bold}>{data.email}</div>
                      <div>Tuesday 12-12-2022 16:00:03</div>
                    </div>
                    <div>
                      Creating project{" "}
                      <span className={styles.Entity}>dsesdwe23</span>{" "}
                      <span className={styles.Danger}>Failed</span>
                    </div>
                  </div>
                  <div className={styles.LastCell}>
                    <div>Not right project description</div>
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
                      Deploying app{" "}
                      <span className={styles.Entity}>4344ewe23</span>{" "}
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
                      Deploying app{" "}
                      <span className={styles.Entity}>4344ewe23</span>{" "}
                      <span className={styles.Success}>Successful</span>
                    </div>
                  </div>
                  <div className={styles.LastCell}>
                    <div>Successfully deployed application.</div>
                  </div>
                </div>
              </div>
              <hr className={styles.hr} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectLogs;
