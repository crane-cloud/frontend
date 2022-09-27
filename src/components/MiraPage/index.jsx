import { React } from "react";
import Dropzone from "../DropZone";
import styles from "./MiraPage.module.css";
import BlackInputText from "../BlackInputText";
import Select from "../Select";
import PrimaryButton from "../PrimaryButton";
import Tooltip from "../Tooltip";
import { retrieveFrameworkChoices } from "../../helpers/frameworkChoices";
import { retrieveRegistryChoices } from "../../helpers/registryChoices";

const MiraPge = () => {
  const frameworks = retrieveFrameworkChoices();
  const registries = retrieveRegistryChoices();

  return (
    <div className={styles.FormInputs}>
      <div className={styles.FormHeading}>Fields marked * are required</div>
      <div className={styles.FrameworkSelect}>
        <Select placeholder="Choose a framework" options={frameworks} />
      </div>
      <div className={styles.RegistrySelect}>
        <Select placeholder="Select a registry" options={registries} />
      </div>
      <div className={styles.FormFieldWithTooltip}>
        <BlackInputText required placeholder="Image Name" />
        <div className={styles.FormInputTooltipContainer}>
          <Tooltip
            showIcon
            message="This is the image repository for your image"
            position="left"
          />
        </div>
      </div>
      <div className={styles.FormFieldWithTooltip}>
        <BlackInputText placeholder="Version" />
        <div className={styles.FormInputTooltipContainer}>
          <Tooltip
            showIcon
            message="This is preferably a tag for your image"
            position="left"
          />
        </div>
      </div>

      <div className={styles.HeadingWithTooltip}>
        <h4>Upload Zip file</h4>
        <Tooltip
          showIcon
          message="This is the zipped folder containing your source code"
        />
      </div>
      <div className={styles.DropSection}>
        <div className={styles.Dropzone}>
          <Dropzone />
        </div>
      </div>

      <div className={styles.ButtonSection}>
        <PrimaryButton className="AuthBtn FullWidth" label="Deploy" />
      </div>
    </div>
  );
};

export default MiraPge;
