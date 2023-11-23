import BlackInputText from "../BlackInputText";
import Checkbox from "../Checkbox";
import Feedback from "../Feedback";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
import Spinner from "../Spinner";

const ImageSettingsTab = ({
  app,
  error,
  loading,
  newImage,
  replicaOptions,
  isPrivateImage,
  togglePrivateImage,
  handleImageChange,
  handleSelectReplicas,
  handleDockerCredentialsChange,
  handleImageSectionSubmit,
}) => (
  <>
    <div className={`APPInstructions BigCard`}>
      <div className="ImageSection">
        <div className="APPButtonRow">
          <div className="AppLabel">Application Image</div>
          <div className="flexa">
            <BlackInputText
              className="settings-input"
              required
              placeholder={app?.image}
              name="newImage"
              value={newImage ? newImage : app?.image}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="APPButtonRow">
          <div className="AppLabel">Replicas</div>
          <div className="flexa">
            <div className="ReplicasSelect">
              <Select
                className="settings-input"
                placeholder={"App has " + app?.replicas + " replica(s)"}
                options={replicaOptions}
                onChange={(selectedOption) =>
                  handleSelectReplicas(selectedOption)
                }
              />
            </div>
          </div>
        </div>

        <div className="APPButtonRow">
          <div className="AppLabel">Private Image</div>
          <Checkbox
            isBlack
            onClick={togglePrivateImage}
            isChecked={isPrivateImage}
          />
        </div>
        {isPrivateImage && (
          <div className="PrivateImageTabContainer">
            <div index={1}>
              <div className="PrivateImageInputs">
                <div className="APPButtonRowName">
                  <div className="AppLabel">Username</div>
                  <div className="flexa">
                    <BlackInputText
                      required
                      className="sub-input"
                      placeholder={app?.username ? app?.username : "Username"}
                      name="username"
                      onChange={handleDockerCredentialsChange}
                    />
                  </div>
                </div>
                <div className="APPButtonRowEmail">
                  <div className="AppLabel">Email</div>
                  <div className="flexa">
                    <BlackInputText
                      required
                      className="sub-input-email"
                      placeholder={app.email ? app.email : "Email"}
                      name="email"
                      onChange={handleDockerCredentialsChange}
                    />
                  </div>
                </div>
                <div className="APPButtonRow">
                  <div className="AppLabel">Password</div>
                  <div className="flexa">
                    <BlackInputText
                      required
                      className="sub-input"
                      placeholder={app.password ? app.password : "Password"}
                      name="password"
                      onChange={handleDockerCredentialsChange}
                    />
                  </div>
                </div>
                <div className="APPButtonRowRegistry">
                  <div className="AppLabel">Registry Server</div>
                  <div className="flexa">
                    <BlackInputText
                      required
                      className="sub-input"
                      placeholder="Registry Server"
                      name="server"
                      onChange={handleDockerCredentialsChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && <Feedback type="error" message={error} />}

        <div className="APPButton">
          <div className="UpperSection">
            <PrimaryButton
              disabled={loading}
              className={loading && "deactivatedBtn"}
              onClick={handleImageSectionSubmit}
            >
              {loading ? <Spinner /> : "Update"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ImageSettingsTab;
