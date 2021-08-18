import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
import CancelButton from "../CancelButton";
import Spinner from "../Spinner";
import Feedback from "../Feedback";
import createApp, {
  clearState,
} from "../../redux/actions/createApp";
// import "./CreateApp.css";

const flavours = [
  { name: "MYSQL", id: 1, value: "mysql" },
  { name: "POSTGRESQL", id: 2, value: "postgres" },
];

class CreateApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      AppFlavour: "",
      error: "",
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { clearState } = this.props;
    clearState();
  }

  componentDidUpdate(prevProps) {
    const {
      isCreated,
      params: { userID, projectID },
    } = this.props;

    if (isCreated !== prevProps.isCreated) {
      return (
        <Redirect
          to={`/users/${userID}/projects/${projectID}/Apps`}
          noThrow
        />
      );
    }
  }

  handleSelectChange(selected) {
    this.setState({ AppFlavour: selected.value });
  }

  handleSubmit() {
    const { AppFlavour } = this.state;
    const {
      createApp,
      params: { projectID },
    } = this.props;
    if (!AppFlavour) {
      this.setState({
        error: "Select a App flavour",
      });
    } else {
      const newDBType = {
        App_flavour_name: AppFlavour,
      };
      createApp(newDBType, projectID);
    }
  }

  render() {
    const {
      isCreating,
      isCreated,
      message,
      params: { userID, projectID },
    } = this.props;
    const { error } = this.state;
    if (isCreated) {
      return (
        <Redirect
          to={`/users/${userID}/projects/${projectID}/Apps`}
          noThrow
        />
      );
    }
    return (
      <div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <div className="InformationBar">
              <div className="InformationBarWithButton">
                <div className="InfoHeader">Create App</div>
                <div className="RoundAddButtonWrap">
                  <CancelButton onClick={this.props.closeComponent} />
                </div>
              </div>
            </div>
          </div>
          <div className="ContentSection">
            <div>
              <div className="AppForm">
                <div className="DBFormElements">
                  <Select
                    required
                    placeholder="App Type"
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
                  <div className="DBButtons">
                    <div className="DBDetailRow">
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
        </div>
      </div>
    );
  }
}
CreateApp.propTypes = {
  isCreating: PropTypes.bool,
  isCreated: PropTypes.bool,
  message: PropTypes.string,
  params: PropTypes.shape({}),
};

CreateApp.defaultProps = {
  message: "",
  isCreated: false,
  isCreating: false,
  params: {},
};

const mapStateToProps = (state) => {
  const { isCreating, isCreated, clearAppCreateState, message, errorCode } =
    state.createAppReducer;

  return {
    isCreating,
    message,
    isCreated,
    clearAppCreateState,
    errorCode
  };
};

const mapDispatchToProps = {
  createApp,
  clearState,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp);
