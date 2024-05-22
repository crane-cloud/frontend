import React from "react";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
import { handlePostRequestWithOutDataObject } from "../../apis/apis.js";
import Spinner from "../Spinner";
import Feedback from "../Feedback";
import "./CreateDatabase.css";
import { DATABASE_API_URL } from "../../config.js";

const flavours = [
  { name: "MYSQL", id: 1, value: "mysql" },
  { name: "POSTGRESQL", id: 2, value: "postgres" },
];

class CreateDatabase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      databaseFlavour: "",
      error: "",
      addingDatabase: false,
      addDatabaseError: "",
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewDatabase = this.addNewDatabase.bind(this);
  }

  // componentDidMount() {

  // }

  // componentDidUpdate(prevProps) {

  // }

  handleSelectChange(selected) {
    this.setState({ databaseFlavour: selected.value });
  }

  handleSubmit() {
    const { databaseFlavour } = this.state;
    const {
      params: { projectID },
    } = this.props;
    if (!databaseFlavour) {
      this.setState({
        error: "Select a database flavour",
      });
    } else {
      const newDBType = {
        database_flavour_name: databaseFlavour,
      };
      //createDatabase(newDBType, projectID);
      this.addNewDatabase(newDBType, projectID);
    }
  }
  addNewDatabase(data, projectID) {
    this.setState({
      addingDatabase: true,
      addDatabaseError: "",
    });
    handlePostRequestWithOutDataObject(data, `${DATABASE_API_URL}/databases`)
      .then(() => {
        window.location.href = `/projects/${projectID}/databases`;
      })
      .catch((error) => {
        this.setState({
          addDatabaseError: "Failed to add Database. Try again later",
          addingDatabase: false,
        });
      });
  }

  render() {
    const { error, addDatabaseError, addingDatabase } = this.state;
    return (
      <div className="DatabaseForm">
        <div className="DBFormElements">
          <Select
            required
            placeholder="Database Type"
            options={flavours}
            onChange={this.handleSelectChange}
          />
          <div />
          <div className="CreateDBError">
            {error && <Feedback type="error" message={error} />}

            {addDatabaseError && (
              <Feedback message={addDatabaseError} type={"error"} />
            )}
          </div>
          <div>
            <PrimaryButton className="CreateBtn" onClick={this.handleSubmit}>
              {addingDatabase ? <Spinner /> : "Create"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateDatabase;
