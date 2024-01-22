import Feedback from "../Feedback";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";

const DisableModalContent = ({
  item,
  disableProgress,
  handleDisableButtonClick,
  hideDisableAlert,
  message,
  isFailed,
}) => {
  const isProject = item && item.type === "project";
  const isDatabase = item && item.type === "database";

  return (
    <div
      className={`DisableContentAlert ${
        isProject ? "Project" : isDatabase ? "Database" : "App"
      }`}
    >
      <div className="AlertUpperSection">
        <div className="WarningContainer">
          <div className="AlertDescription">
            Are you sure you want to {item?.disabled ? "enable" : "disable"}{" "}
            <span>{item.name}</span>&nbsp;?
          </div>
          <div className="AlertSubDescription">
            {item?.disabled
              ? `Allow access to ${
                  isProject ? "project" : isDatabase ? "database" : "app"
                } resources and enable billing`
              : `This will prevent your ${
                  isProject ? "project" : isDatabase ? "database" : "app"
                } from being billed by blocking access to its resources.`}
          </div>
        </div>
      </div>

      <div className="AlertLowerSection">
        <div className="AlertButtons">
          <PrimaryButton className="CancelBtn" onClick={hideDisableAlert}>
            Cancel
          </PrimaryButton>
          <PrimaryButton
            color={!item?.disabled && "red"}
            disabled={disableProgress}
            onClick={handleDisableButtonClick}
          >
            {disableProgress ? <Spinner /> : "Confirm"}
          </PrimaryButton>
        </div>

        {message && message !== "" && (
          <Feedback type={isFailed ? "error" : "success"} message={message} />
        )}
      </div>
    </div>
  );
};

export default DisableModalContent;
