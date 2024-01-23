import AppStatus from "../AppStatus";

const GeneralDetailsTab = ({ parentProject, app }) => (
  <div className={`APPInstructions BigCard`}>
    <div className="APPButtonRow">
      <div className="AppLabel">Project Name</div>
      <div className="flexa">{parentProject?.name}</div>
    </div>
    <div className="APPButtonRow">
      <div className="AppLabel">Application Name</div>
      <div className="flexa">{app?.name}</div>
    </div>
    <div className="APPButtonRow">
      <div className="AppLabel">Alias</div>
      <div className="flexa">{app?.alias}</div>
    </div>
    <div className="APPButtonRow">
      <div className="AppLabel">Application Status</div>
      <div className="ShowStatus">
        {app.app_running_status === "disabled" ? (
          <div className="DeployText">Disabled</div>
        ) : app.app_running_status === "running" ? (
          <div className="StatusIcon">
            <AppStatus appStatus={app.app_running_status} />
            <div>&nbsp;Ready</div>
          </div>
        ) : (
          <div className="StatusIcon">
            <AppStatus appStatus={app.app_running_status} />
            <div>&nbsp;Failing</div>
          </div>
        )}
      </div>
    </div>
    <div className="APPButtonRow">
      <div className="AppLabel">Age</div>
      <div className="flexa">{app.age}</div>
    </div>
    <div className="APPButtonRow">
      <div className="AppLabel">Current Revision</div>
      <div className="flexa">{app.revision_id}</div>
    </div>
  </div>
);

export default GeneralDetailsTab;
