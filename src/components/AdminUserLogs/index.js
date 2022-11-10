import InformationBar from "../InformationBar";
import Header from "../Header";
import SideNav from "../SideNav";
import Status from "../Status";
import "./AdminUserLogs.css";
import { useParams } from "react-router-dom";

const AdminUserLogs = () => {
  const { clusterID } = useParams();
  const clusterName = localStorage.getItem("clusterName");

  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="MainSection">
        <div className="SideBarSection">
          <SideNav clusterName={clusterName} clusterId={clusterID} />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar header="Accounts/SampleUser" showBtn={false} />
          </div>
          <div className="ContentSection">
            <div className="DatabaseTable MetricsCardContainer">
              <div className="DatabaseTableRow CardHeaderSection">
                <div className="DatabaseTableHead">Email</div>
                <div className="DatabaseTableHead">Action</div>
                <div className="DatabaseTableHead">Status</div>
                <div className="DatabaseTableHead">Date & Time</div>
              </div>
              <div className="DatabaseBody">
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleUser</div>
                  <div className="DatabaseTableCell">Created a project</div>
                  <div className="DatabaseTableCell">
                    <Status status={true} />
                  </div>
                  <div className="DatabaseTableCell">12-12-2022 16:00</div>
                </div>
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleUser</div>
                  <div className="DatabaseTableCell">Updated a project</div>
                  <div className="DatabaseTableCell">
                    <Status status={true} />
                  </div>
                  <div className="DatabaseTableCell">12-12-2022 16:00</div>
                </div>
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleUser</div>
                  <div className="DatabaseTableCell">Deleted a project</div>
                  <div className="DatabaseTableCell">
                    <Status status={true} />
                  </div>
                  <div className="DatabaseTableCell">12-12-2022 16:00</div>
                </div>
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleUser</div>
                  <div className="DatabaseTableCell">
                    Deployed an application
                  </div>
                  <div className="DatabaseTableCell">
                    <Status status={true} />
                  </div>
                  <div className="DatabaseTableCell">12-12-2022 16:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserLogs;
