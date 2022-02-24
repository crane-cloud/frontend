import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
import CancelButton from "../CancelButton";
import Spinner from "../Spinner";
import Feedback from "../Feedback";
import createDatabase, {
  clearDatabaseCreateState,
} from "../../redux/actions/createDatabase";
import "./CreateDatabase.css";

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
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { clearDatabaseCreateState } = this.props;
    clearDatabaseCreateState();
  }

  componentDidUpdate(prevProps) {
    const {
      isCreated,
      params: { projectID },
    } = this.props;

    if (isCreated !== prevProps.isCreated) {
      return <Redirect to={`/projects/${projectID}/databases`} noThrow />;
    }
  }

  handleSelectChange(selected) {
    this.setState({ databaseFlavour: selected.value });
  }

  handleSubmit() {
    const { databaseFlavour } = this.state;
    const {
      createDatabase,
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
      createDatabase(newDBType, projectID);
    }
  }

  render() {
    const {
      isCreating,
      isCreated,
      message,
      params: { projectID },
    } = this.props;
    const { error } = this.state;
    if (isCreated) {
      return <Redirect to={`/projects/${projectID}/databases`} noThrow />;
    }
    return (
      <div>
        <div className="MainContentSection">
          <div className="InformationBarSection ">
            <div className="InformationBar">
              <div className="InformationBarWithButton SmallContainer">
                <div className="InfoHeader">Create database</div>
                <div className="RoundAddButtonWrap">
                  <CancelButton onClick={this.props.closeComponent} />
                </div>
              </div>
            </div>
          </div>
          <div className="ContentSection SmallContainer">
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
CreateDatabase.propTypes = {
  isCreating: PropTypes.bool,
  isCreated: PropTypes.bool,
  message: PropTypes.string,
  params: PropTypes.shape({}),
};

CreateDatabase.defaultProps = {
  message: "",
  isCreated: false,
  isCreating: false,
  params: {},
};

const mapStateToProps = (state) => {
  const { isCreating, isCreated, clearDatabaseCreateState, message } =
    state.createDatabaseReducer;

  return {
    isCreating,
    message,
    isCreated,
    clearDatabaseCreateState,
  };
};

const mapDispatchToProps = {
  createDatabase,
  clearDatabaseCreateState,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDatabase);
