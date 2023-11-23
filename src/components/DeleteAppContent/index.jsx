import BlackInputText from "../BlackInputText";
import DeleteWarning from "../DeleteWarning";
import PrimaryButton from "../PrimaryButton";
import Feedback from "../Feedback";
import Spinner from "../Spinner";

const DeleteAppContent = ({
  app,
  verifiedName,
  handleAppName,
  loading,
  error,
  disableDelete,
  onConfirm,
  onCancel,
}) => (
  <>
    <div className="DeleteAppModel">
      <div className="DeleteModalUpperSection">
        <div className="WarningContainer">
          <div className="DeleteDescription">
            Are you sure you want to delete&nbsp;
            <span>{app.name}</span>
            &nbsp;?
          </div>
          <div className="DeleteSubDescription">
            This will permanently delete the application. Please confirm by
            typing <b className="DeleteWarning">{app.name}</b> below.
          </div>
          <div className="InnerModalDescription">
            <BlackInputText
              required
              placeholder={app.name}
              name="ConfirmAppname"
              value={verifiedName}
              onChange={handleAppName}
            />
            <DeleteWarning textAlignment="Left" />
          </div>
        </div>
      </div>

      <div className="DeleteModalLowerSection">
        <div className="DeleteAppModelButtons">
          <PrimaryButton className="CancelBtn" onClick={onCancel}>
            Cancel
          </PrimaryButton>
          <PrimaryButton
            className={disableDelete && "InactiveDelete"}
            color={!disableDelete && "red"}
            disabled={disableDelete}
            onClick={onConfirm}
          >
            {loading ? <Spinner /> : "Delete"}
          </PrimaryButton>
        </div>

        {error && <Feedback type="error" message={error} />}
      </div>
    </div>
  </>
);

export default DeleteAppContent;
