import Feedback from "../Feedback";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";

const RollbackConfirmationContent = ({
  onConfirm,
  onCancel,
  loading,
  error,
}) => (
  <>
    <div className="ReviseAppModal">
      <div className="DeleteProjectModalUpperSection">
        <div className="WarningContainer">
          <div className="ReviseAppDescription">
            Are you sure you want to revise your app?
          </div>
        </div>
      </div>
      <div className="ReviseAppModalLowerSection">
        <div className="ReviseAppModalButtons">
          <PrimaryButton
            className="CancelBtn"
            label="Cancel"
            onClick={onCancel}
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton onClick={onConfirm}>
            {loading ? <Spinner /> : "Confirm"}
          </PrimaryButton>
        </div>
      </div>
    </div>
    {error && <Feedback type="error" message={"Failed to rollback"} />}
  </>
);

export default RollbackConfirmationContent;
