import Feedback from "../Feedback";
import "./AppSettingsError.css";

const AppSettingsError = ({ message }) =>
  message ? (
    <div className="errorCenterDiv">
      <Feedback type="error" message={message} />
    </div>
  ) : null;

export default AppSettingsError;
