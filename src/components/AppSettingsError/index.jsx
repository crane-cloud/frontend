import Feedback from "../Feedback";
import "./AppSettingsError.css";

const AppSettingsError = ({ message, type = "error" }) =>
  message ? (
    <div className="errorCenterDiv">
      <Feedback
        type={type === "error" ? "error" : "success"}
        message={message}
      />
    </div>
  ) : null;

export default AppSettingsError;
