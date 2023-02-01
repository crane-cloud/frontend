import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import moment from "moment";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";
import { handleGetRequest } from "../../apis/apis.js";
import InformationBar from "../../components/InformationBar";
import styles from "./UserActivity.module.css";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
// import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
// import { ReactComponent as Upload } from "../../assets/images/upload-cloud.svg";
import { DisplayDateTime } from "../../helpers/dateConstants";
import Spinner from "../../components/Spinner";

const UserActivity = (props) => {
  const { data } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = () => {
    setLoading(true);
    //projectID
    handleGetRequest(`/users/activities?a_user_id=${data.id}`)
      .then((response) => {
        if (response.data.data.activity.length > 0) {
          setLogs(response.data.data.activity);
        } else {
          setFeedback("No logs for you");
        }
        setLoading(false);
      })
      .catch((error) => {
        setFeedback("Failed to fetch logs, please try again");
        setLoading(false);
      });
  };
  return (
    // empty a div to fix root justification on this page
    <div>
    <div className={styles.Page}>
      <div className={styles.TopBarSection}>
        <Header />
      </div>
      <div className={styles.MainSection}>
        <div>
          <InformationBar header="User Activity" />
        </div>
        <div className={styles.SmallContainer}>
          <Link to={`/projects`}>
            <PrimaryButton className={styles.BackButton}>BACK</PrimaryButton>
          </Link>
          <div className={styles.Header}>
            <div className={styles.Heading}>Activity Feed</div>
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
          <div className="BigCard">
            {loading ? (
              <Spinner />
            ) : feedback !== "" ? (
              <div className={styles.NoResourcesMessage}>{feedback}</div>
            ) : (
              logs.map((item, index) => (
                <div key={index}>
                  <div className={styles.TableRow}>
                    {item.status === "Success" ? (
                      <CheckMark className={styles.Success} />
                    ) : (
                      <Danger className={styles.Danger} />
                    )}
                    <div className={styles.Row}>
                      <div className={styles.RowCell}>
                        <Avatar
                          name={data.name}
                          className={styles.UserAvatar}
                        />
                        <div>
                          <div className={styles.ActivityEmail}>
                            {data.email}:
                          </div>
                          <div className={styles.ActivityDate}>
                            {DisplayDateTime(new Date(item.creation_date))}
                          </div>
                        </div>
                        <div>
                          {item.operation}
                          <span className={styles.Entity}>{item._id.$oid}</span>{" "}
                          <span
                            className={
                              item.status === "Success"
                                ? styles.Success
                                : styles.Danger
                            }
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className={styles.ActivityDescription}>
                        <div>{item.description}</div>
                      </div>
                    </div>
                  </div>
                  {index !== logs.length - 1 && <hr className={styles.hr} />}
                </div>
              ))
            )}

            {/* <div className={styles.TableRow}>
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
            */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default UserActivity;
