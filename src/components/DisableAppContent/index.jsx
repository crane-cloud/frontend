import Feedback from "../Feedback";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";

const DisableAppContent = ({
  app,
  appDisableProgress,
  handleEnableButtonClick,
  setShowAppDisableModal,
  message,
  isFailed,
}) => (
  <div className="DeleteAppModel">
    <div className="DeleteModalUpperSection">
      <div className="WarningContainer">
        <div className="DeleteDescription">
          Are you sure you want to {app?.disabled ? "enable" : "disable"}{" "}
          <span>{app.name}</span>&nbsp;?
        </div>
        <div className="DeleteSubDescription">
          {app?.disabled
            ? "Allow access to App resources and enable billing"
            : "This will prevent your app from being billed by blocking access to its resources."}
        </div>
      </div>
    </div>

    <div className="DeleteModalLowerSection">
      <div className="DeleteAppModelButtons">
        <PrimaryButton
          className="CancelBtn"
          onClick={() => setShowAppDisableModal(false)}
        >
          Cancel
        </PrimaryButton>
        <PrimaryButton
          color={!app?.disabled && "red"}
          disabled={appDisableProgress}
          onClick={handleEnableButtonClick}
        >
          {appDisableProgress ? <Spinner /> : "Confirm"}
        </PrimaryButton>
      </div>

      {message !== "" && (
        <Feedback type={isFailed ? "error" : "success"} message={message} />
      )}
    </div>
  </div>
);

export default DisableAppContent;
