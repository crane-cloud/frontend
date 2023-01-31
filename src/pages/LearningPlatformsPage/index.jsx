import React from "react";
import NewHeader from "../../components/NewHeader";
import { ReactComponent as GitLab } from "../../assets/images/gitlab.svg";
import { ReactComponent as GoPlayground } from "../../assets/images/go.svg";
import { ReactComponent as Jupyterhub } from "../../assets/images/py.svg";
import { ReactComponent as RightArrow } from "../../assets/images/rightArrow.svg";
import { GITLAB_URL, GOPLAYGROUND_URL, JUPYTERHUB_URL } from "../../config";
import styles from "./LearningPlatformsPage.module.css";

const LearningPlatformsPage = () => {
  return (
    <>
      <NewHeader />
      <div className={styles.PageContainer}>
        <div className={styles.CardContainer}>
          <div className={styles.CardSection}>
            <div>
              <GitLab className={styles.Brand} />
              <h3>Self Managed GitLab</h3>
              <div>
                GitLab is a web-based Git repository manager that provides
                source code management (SCM), continuous integration, and more.
                It's used for version control and code collaboration.
              </div>
              <div className={styles.ButtonSection}>
                <a
                  href={`${GITLAB_URL}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <button className={styles.GetStartedButton}>
                    <div>Get Started</div>
                    <RightArrow />
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.CardSection}>
            <div>
              <GoPlayground className={styles.Brand} />
              <h3>Go Playground</h3>
              <div>
                Online tool for executing and testing Go code snippets in a
                browser, without having to install Go or set up a local
                development environment. It allows sharing code with others.
              </div>
              <div className={styles.ButtonSection}>
                <a
                  href={`${GOPLAYGROUND_URL}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <button className={styles.GetStartedButton}>
                    <div>Get Started</div>
                    <RightArrow />
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.CardSection}>
            <div>
              <Jupyterhub className={styles.Brand} />
              <h3>JupyterHub</h3>
              <div>
                JupyterHub brings the power of notebooks to groups of users. It
                gives users access to computational environments and resources
                without burdening the users
              </div>
              <div className={styles.ButtonSection}>
                <a
                  href={`${JUPYTERHUB_URL}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <button className={styles.GetStartedButton}>
                    <div>Get Started</div>
                    <RightArrow />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningPlatformsPage;
