import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import BlackInputText from "../BlackInputText";
import PrimaryButton from "../PrimaryButton";
import Checkbox from "../Checkbox";
import Spinner from "../Spinner";

const DomainAndUrlsTab = ({
  app,
  updating,
  reverting,
  urlOnClick,
  revertAppUrl,
  internalUrlOnClick,
  urlChecked,
  internalUrlChecked,
  loggedInUser,
  isCustomDomain,
  domainName,
  toggleCustomDomain,
  showDomainModal,
  handleDomainChange,
  handleDomainSubmit,
}) => (
  <div className={`APPInstructions BigCard`}>
    <div className="APPButtonRow">
      <div className="AppLabel">Application Link</div>
      <div className="CopyDiv">
        <div className="DBTDetail">{app?.url}</div>
        <div className="CopyUrl">
          <CopyText onClick={urlOnClick} />
          {urlChecked ? <Checked /> : null}
        </div>
      </div>
    </div>

    {app?.internal_url && (
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
    )}

    {loggedInUser.data.beta && (
      <div className="APPButtonRow">
        <div className="AppLabel">Custom Domain</div>
        <Checkbox
          isBlack
          onClick={toggleCustomDomain}
          isChecked={app?.has_custom_domain === true || isCustomDomain}
        />
      </div>
    )}

    {isCustomDomain || app?.has_custom_domain ? (
      <>
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
                    className="domain-input"
                    placeholder={
                      app?.has_custom_domain === true ? app?.url : "Domain Name"
                    }
                    name="domainName"
                    onChange={handleDomainChange}
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

        <div className="APPButton">
          <div className="UpperSection">
            <PrimaryButton onClick={() => handleDomainSubmit()}>
              {updating ? <Spinner /> : "Update"}
            </PrimaryButton>
          </div>
        </div>

        <hr className="SectionSplit" />
        <div className="RevertSection">
          <div className="FlexRevertSection">
            <div>
              <strong>Revert to Default URL</strong>
            </div>
            <div>Reverts to cranecloud's auto-generated URL.</div>
          </div>
          <div className="SectionButtons">
            <PrimaryButton
              className="RevertButton"
              onClick={() => revertAppUrl()}
            >
              {reverting ? <Spinner /> : "Revert"}
            </PrimaryButton>
          </div>
        </div>
      </>
    ) : null}
  </div>
);

export default DomainAndUrlsTab;
