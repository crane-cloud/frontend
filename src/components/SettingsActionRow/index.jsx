import PrimaryButton from "../PrimaryButton";

const SettingsActionRow = ({
  title,
  content,
  buttonLabel,
  buttonColor,
  disabled=false,
  onButtonClick,
}) => (
  <div className="MemberTableRow">
    <div className="SettingsSectionInfo2">
      <div className="SubTitle">{title}</div>
      <div className="SubTitleContent">{content}</div>
    </div>
    <div className="SectionButtons">
      <PrimaryButton disabled={disabled} onClick={onButtonClick} color={buttonColor}>
        {buttonLabel}
      </PrimaryButton>
    </div>
  </div>
);

export default SettingsActionRow;
