import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import BlackInputText from "../BlackInputText";
import PrimaryButton from "../PrimaryButton";
import Checkbox from "../Checkbox";

const DomainAndUrlsTab = ({
  app,
  loading,
  urlOnClick,
  internalUrlOnClick,
  urlChecked,
  internalUrlChecked,
  loggedInUser,
  isCustomDomain,
  domainName,
  toggleCustomDomain,
  showDomainModal,
}) => (
  <div className={`APPInstructions BigCard`}>
    <div className="APPButtonRow">
      <div className="AppLabel">Application Link</div>
      <div className="CopyDiv">
        <div className="DBTDetail">{app.url}</div>
        <div className="CopyUrl">
          <CopyText onClick={urlOnClick} />
          {urlChecked ? <Checked /> : null}
        </div>
      </div>
    </div>
    <div className="APPButtonRow">
      <div className="AppLabel">Internal URL</div>
      <div className="CopyDiv">
        <div className="DBTDetail">{app.internal_url}</div>
        <div className="CopyUrl">
          <CopyText onClick={internalUrlOnClick} />
          {internalUrlChecked ? <Checked /> : null}
        </div>
      </div>
    </div>

    {loggedInUser.data.beta && (
      <div className="APPButtonRow">
        <div className="AppLabel">Custom Domain</div>
        <Checkbox
          isBlack
          onClick={toggleCustomDomain}
          isChecked={isCustomDomain}
        />
      </div>
    )}

    {isCustomDomain && (
      <div className="CustomDomainTabContainer">
        <div index={1}>
          <div className="CustomDomainInputs">
            <div className="APPButtonRow">
              <div className="AppLabel">
                {app?.has_custom_domain === true && <span>Edit &nbsp;</span>}
                Domain name
              </div>
              <div className="flexa">
                <BlackInputText
                  required
                  className="domain-input"
                  placeholder="Domain name"
                  name="domainName"
                  value={domainName.toLowerCase()}
                />
              </div>
            </div>
            <div className="Domain__Popup" onClick={showDomainModal}>
              Click for more instructions on how to set up you custom domain.
            </div>
          </div>
        </div>
      </div>
    )}

    <div className="APPButton">
      <div className="UpperSection">
        <PrimaryButton
          disabled={loading}
          className={loading && "deactivatedBtn"}
        >
          Update
        </PrimaryButton>
      </div>
    </div>

    {isCustomDomain && (
      <>
        <hr className="SectionSplit" />
        <div className="RevertSection">
          <div className="FlexRevertSection">
            <div>
              <strong>Revert to Default URL</strong>
            </div>
            <div>Reverts to cranecloud's auto-generated URL.</div>
          </div>
          <div className="SectionButtons">
            <PrimaryButton className="RevertButton">Revert</PrimaryButton>
          </div>
        </div>
      </>
    )}
  </div>
);

export default DomainAndUrlsTab;
