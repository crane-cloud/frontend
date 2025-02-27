import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { handleGetRequest } from "../../apis/apis";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import styles from "./NotebookDeploymentsPage.module.css";

const NotebookDeploymentsPage = () => {
  const { appID } = useParams();

  const [app, setApp] = useState([]);

  const getAppInfo = () => {
    if (!app) return null;
    return {
      name: app.name,
      status: app.app_running_status,
      url: app.url,
      age: app.age,
      alias: app.alias,
      image: app.image,
      port: app.port,
      disable: app.disabled,
    };
  };

  useEffect(() => {
    handleGetRequest(`/apps/${appID}`)
      .then((response) => {
        setApp(response.data.data.apps);
      })
      .catch((error) => {
        console.error(error?.response?.data?.message);
      });
  }, [appID]);

  const appInfo = getAppInfo();

  return (
    <>
      <DashboardLayout
        name={appInfo.name}
        header={"Notebook Deployments"}
        appCategory={"notebook"}
      >
        <table className="PodsTable">
          <div className={styles.NoResourcesMessageSection}>
            <div className={styles.NoResourcesMessage}>
              You haven't created any deployments yet.
            </div>
            <br></br>
            <div className={styles.NoResourcesMessage}>
              Click the &nbsp; <ButtonPlus className={styles.ButtonPlusSmall} />{" "}
              &nbsp; button to create one.
            </div>
          </div>
        </table>
      </DashboardLayout>
    </>
  );
};

export default NotebookDeploymentsPage;
