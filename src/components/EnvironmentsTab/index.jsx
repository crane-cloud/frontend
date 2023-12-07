import { v4 as uuidv4 } from "uuid";
import BlackInputText from "../BlackInputText";
import PrimaryButton from "../PrimaryButton";
import AppSettingsError from "../AppSettingsError";
import Spinner from "../Spinner";

const EnvironmentAndPortsTab = ({
  envVars,
  varName,
  varValue,
  handleEnvChange,
  addEnvVar,
  envError,
  app,
  port,
  entryCommand,
  handleEnvSubmit,
  removeExistingEnvVar,
  loading,
  commandError,
  portError,
  error,
  clearEnvError,
  clearPortError,
  clearCommandError,
}) => (
  <div className={`APPInstructions BigCard`}>
    <div className="cardSectionTitle">Environment Variables</div>

    {envVars !== null &&
      Object.keys(envVars).map((envVar, index) => (
        <div key={uuidv4()}>
          <div className="EnvInputItem">
            <div className="VarInputGroup">
              <BlackInputText
                placeholder="Key"
                value={envVar}
                className="settings-input name-input"
                readOnly={true}
              />
              <BlackInputText
                placeholder="Value"
                name="varValue"
                value={envVars[envVar]}
                className="settings-input value-input"
                style={{ flex: 1 }}
                readOnly={true}
              />
            </div>
            <div className="EnvVarsAddBtn">
              <PrimaryButton
                onClick={() => removeExistingEnvVar(index)}
                color="red"
                small
              >
                Remove
              </PrimaryButton>
            </div>
          </div>
        </div>
      ))}

    <div className="EnvInputItem">
      <div className="VarInputGroup">
        <BlackInputText
          placeholder="Key"
          name="varName"
          value={varName}
          className="settings-input name-input"
          onChange={handleEnvChange}
          onFocus={clearEnvError}
        />
        <BlackInputText
          placeholder="Value"
          name="varValue"
          value={varValue}
          className="settings-input value-input"
          style={{ flex: 1 }}
          onChange={handleEnvChange}
          onFocus={clearEnvError}
        />
      </div>
      <div className="EnvVarsAddBtn">
        <PrimaryButton onClick={addEnvVar} color="primary" small>
          Add
        </PrimaryButton>
      </div>
    </div>

    {envError && <AppSettingsError message={envError} />}

    <hr className="SectionSplit" />

    <div className="cardSectionTitle">Port and Entry Commands</div>
    <div className="Environments">
      <div className="PortSection">
        <div>Port</div>
        <div className="commandInputSection">
          <div className="flexa">
            <BlackInputText
              type="text"
              placeholder={app.port ? app.port : "port"}
              name="port"
              value={port}
              className="portInput"
              onChange={handleEnvChange}
              onFocus={clearPortError}
            />
          </div>
        </div>
      </div>
      <div className="PortSection">
        <div>Entry Command</div>
        <div className="commandInputSection">
          <div className="flexa">
            <BlackInputText
              type="text"
              placeholder={app.command ? app.command : "command"}
              name="entryCommand"
              value={entryCommand}
              className="portInput"
              onChange={handleEnvChange}
              onFocus={clearCommandError}
            />
          </div>
        </div>
      </div>
    </div>

    {commandError && <AppSettingsError message={commandError} />}

    {portError && <AppSettingsError message={portError} />}

    {error && <AppSettingsError message={error} />}

    <div className="APPButton">
      <div className="UpperSection">
        <PrimaryButton onClick={() => handleEnvSubmit()}>
          {loading ? <Spinner /> : "Update"}
        </PrimaryButton>
      </div>
    </div>
  </div>
);

export default EnvironmentAndPortsTab;
