import { DisplayDateTime } from "../../helpers/dateConstants";
import { ReactComponent as Upload } from "../../assets/images/upload-cloud.svg";

const RevisionItem = ({ entry, onRollbackClick }) => (
  <div className={`version-item ${entry.current ? "current" : ""}`}>
    <div className="version-details">
      <span className="upload-icon">
        <Upload className="Success" />
      </span>
      <div className="version-header">
        <div className="version-name">{entry.image}</div>
        <div className="version-id">{entry.revision_id}</div>
      </div>
    </div>
    <div className="version-date">
      {DisplayDateTime(new Date(entry.created_at))}
    </div>
    {!entry.current ? (
      <div
        className="rollback-link"
        onClick={() => onRollbackClick(entry.revision_id)}
      >
        Rollback here
      </div>
    ) : (
      <span className="current-label">Current</span>
    )}
  </div>
);

const RevisionsList = ({ revisions, onRollbackClick }) =>
  revisions
    ?.sort((a, b) => (a.current === b.current ? 0 : a.current ? -1 : 1))
    ?.map((entry) => (
      <RevisionItem
        key={entry.revision_id}
        entry={entry}
        onRollbackClick={onRollbackClick}
      />
    ));

export default RevisionsList;
