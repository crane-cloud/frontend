import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
import CancelButton from "../CancelButton";
import Spinner from "../Spinner";
import Feedback from "../Feedback";
import createAdminDB, {
  clearAdminCreateDBState,
} from "../../redux/actions/adminCreateDB";
// import "./CreateAdminDB.css";
import styles from "./AdminDB.module.css";
import BlackInputText from "../BlackInputText";
import { validateName } from "../../helpers/validation";

const flavours = [
  { name: "MYSQL", id: 1, value: "mysql" },
  { name: "POSTGRESQL", id: 2, value: "postgres" },
];

class CreateAdminDB extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      databaseFlavour: "",
      error: "",
      dbName: "",
      projectId: "",
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { clearAdminCreateDBState } = this.props;
    clearAdminCreateDBState();
  }

  componentDidUpdate(prevProps) {
    const { isCreated } = this.props;

    if (isCreated !== prevProps.isCreated) {
      return <Redirect to={`/databases`} noThrow />;
    }
  }

  handleSelectChange(selected) {
    this.setState({ databaseFlavour: selected.value });
  }

  handleSubmit() {
    const { databaseFlavour, dbName, projectId } = this.state;
    const {
      createDatabase,
      params: { projectID },
    } = this.props;
    if (!databaseFlavour) {
      this.setState({
        error: "Select a database flavour",
      });
    } else if (!dbName || !projectId) {
      // if user tries to submit empty email/password
      this.setState({
        error: "Database name & project name are required",
      });
    } else if (validateName(dbName) === false) {
      this.setState({
        error: "Name should start with a letter",
      });
    } else if (validateName(dbName) === "false_convention") {
      this.setState({
        error: "Database name may only contain letters,numbers,dot and a hypen -",
      });
    } else if (projectId.length !== 36) {
      this.setState({
        error: "Project ID is incorrect",
      });
    } else {
      const newDBType = {
        database_flavour_name: databaseFlavour,
      };
      createDatabase(newDBType, projectID);
    }
  }

  render() {
    const { isCreating, isCreated, message } = this.props;
    const { error, dbName, projectId } = this.state;
    if (isCreated) {
      return <Redirect to={`/databases`} noThrow />;
    }
    return (
      <div className="CreatePage">
        <div className="MainContentSection">
          <div className="InformationBarSection ">
            <div className="InformationBar">
              <div className="InformationBarWithButton SmallContainer">
                <div className="InfoHeader">Admin Create database</div>
                <div className="RoundAddButtonWrap">
                  <CancelButton onClick={this.props.closeComponent} />
                </div>
              </div>
            </div>
          </div>
          <div className="ContentSection SmallContainer">
            <div className="DatabaseForm">
              <div className={styles.DBFormElements}>
                <Select
                  required
                  placeholder="Database Type"
                  options={flavours}
                  onChange={this.handleSelectChange}
                />
                <div />
                <BlackInputText
                  required
                  placeholder="Database Name"
                  name="dbName"
                  value={dbName}
                  onChange={(e) => {
                    this.handleDockerCredentialsChange(e);
                  }}
                />

                <BlackInputText
                  required
                  placeholder="Project ID"
                  name="projectId"
                  value={projectId}
                  onChange={(e) => {
                    this.handleDockerCredentialsChange(e);
                  }}
                />
                <div className="CreateDBError">
                  {error && <Feedback type="error" message={error} />}

                  {message && (
                    <Feedback
                      message={message !== "" ? message : null}
                      type={isCreated ? "success" : "error"}
                    />
                  )}
                </div>
                <div>
                  <PrimaryButton
                    label={isCreating ? <Spinner /> : "Create"}
                    className="CreateBtn"
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateAdminDB.propTypes = {
  isCreating: PropTypes.bool,
  isCreated: PropTypes.bool,
  message: PropTypes.string,
  params: PropTypes.shape({}),
};

CreateAdminDB.defaultProps = {
  message: "",
  isCreated: false,
  isCreating: false,
  params: {},
};

const mapStateToProps = (state) => {
  const { isCreating, isCreated, clearAdminCreateDBState, message } =
    state.adminCreateDBReducer;

  return {
    isCreating,
    message,
    isCreated,
    clearAdminCreateDBState,
  };
};

const mapDispatchToProps = {
  createAdminDB,
  clearAdminCreateDBState,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminDB);
