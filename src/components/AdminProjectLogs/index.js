import InformationBar from "../InformationBar";
import Header from "../Header";
import SideNav from "../SideNav";
import Status from "../Status";
import "./AdminProjectLogs.css";
import { useParams } from "react-router-dom";

const AdminProjectLogs = () => {
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
            <InformationBar
              header="Projects/SampleProjectName"
              showBtn={false}
            />
          </div>
          <div className="ContentSection">
            <div className="DatabaseTable MetricsCardContainer">
              <div className="DatabaseTableRow CardHeaderSection">
                <div className="DatabaseTableHead">Project</div>
                <div className="DatabaseTableHead">Action</div>
                <div className="DatabaseTableHead">Status</div>
                <div className="DatabaseTableHead">Date & Time</div>
              </div>
              <div className="DatabaseBody">
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleProjectName</div>
                  <div className="DatabaseTableCell">Created</div>
                  <div className="DatabaseTableCell">
                    <Status status={true} />
                  </div>
                  <div className="DatabaseTableCell">12-12-2022 16:00</div>
                </div>
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleProjectName</div>
                  <div className="DatabaseTableCell">Updated</div>
                  <div className="DatabaseTableCell">
                    <Status status={true} />
                  </div>
                  <div className="DatabaseTableCell">12-12-2022 16:00</div>
                </div>
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleProjectName</div>
                  <div className="DatabaseTableCell">Deleted</div>
                  <div className="DatabaseTableCell">
                    <Status status={true} />
                  </div>
                  <div className="DatabaseTableCell">12-12-2022 16:00</div>
                </div>
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleProjectName</div>
                  <div className="DatabaseTableCell">Updated</div>
                  <div className="DatabaseTableCell">
                    <Status status={true} />
                  </div>
                  <div className="DatabaseTableCell">12-12-2022 16:00</div>
                </div>
                <div className="DatabaseTableRow">
                  <div className="DatabaseTableCell">SampleProjectName</div>
                  <div className="DatabaseTableCell">Updated</div>
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

export default AdminProjectLogs;
