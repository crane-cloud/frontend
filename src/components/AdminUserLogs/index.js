import InformationBar from "../InformationBar";
import Header from "../Header";
import SideNav from "../SideNav";
import Avatar from "../../components/Avatar";
import {ReactComponent as CheckMark} from "../../assets/images/check-circle.svg";
import {ReactComponent as Danger} from "../../assets/images/alert-octagon.svg";
import {ReactComponent as CloudOff} from "../../assets/images/cloud-off.svg";
import {ReactComponent as Upload} from "../../assets/images/upload-cloud.svg";
import styles from "./AdminUserLogs.module.css";
// import { useParams } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import {Link} from "react-router-dom";

const AdminUserLogs = () => {
  const clusterID = localStorage.getItem("clusterID");

  const clusterName = localStorage.getItem("clusterName");

  return (
    <div className={styles.Page}>
      <div className={styles.TopBarSection}>
        <Header />
      </div>
      <div className={styles.MainSection}>
        <div className={styles.SideBarSection}>
          <SideNav clusterName={clusterName} clusterId={clusterID} />
        </div>
        <div className={styles.MainContentSection}>
          <div className="InformationBarSection">
            <InformationBar
              header={
                <span>
                  <Link className="breadcrumb" to={`/accounts`}>
                    Accounts
                  </Link>
                   / Logs
                </span>
              }
              showBtn={false}
            />
          </div>

          <div className={styles.SmallContainer}>
            <div className={styles.Header}>
              <div className={styles.Heading}>User Account logs</div>
              <div className={styles.SimpleForm}>
                <input
                  type="text"
                  className={styles.field}
                  placeholder=" Filter by Status"
                />
                <PrimaryButton className={styles.FilterButton}>
                  Filter
                </PrimaryButton>
              </div>
            </div>
            <div className={styles.Table}>
              <div className={styles.TableRow}>
                <CheckMark className={styles.Success} />
                <div className={styles.Row}>
                  <div className={styles.RowCell}>
                    <Avatar name="Rhodin" className={styles.UserAvatar} />
                    <div>
                      <div className={styles.Bold}>rhodin@cranecloud.io</div>
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
                    <Avatar name="Rhodin" className={styles.UserAvatar} />
                    <div>
                      <div className={styles.Bold}>rhodin@cranecloud.io</div>
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
                    <Avatar name="Rhodin" className={styles.UserAvatar} />
                    <div>
                      <div className={styles.Bold}>rhodin@cranecloud.io</div>
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
                    <Avatar name="Rhodin" className={styles.UserAvatar} />
                    <div>
                      <div className={styles.Bold}>rhodin@cranecloud.io</div>
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

export default AdminUserLogs;
