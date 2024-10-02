import React, { useState } from 'react';
import styles from './DockerfilePreviewComponent.module.css'; 

const DockerfilePreviewComponent = ({ selectedDependencies }) => {
  const [copied, setCopied] = useState(false);

  const dockerfileContent = `
  FROM python:3.10

  # set the (container) working directory
  WORKDIR /app

  # install netcat
  RUN apt-get update && \\
      apt-get install netcat-traditional -y

  # install dependencies
  RUN pip install ${selectedDependencies.join(' ')}

  # make port available to the world outside this container
  EXPOSE 5000
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(dockerfileContent.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.dockerfilePreviewContainer}>
      <div className={styles.copyButtonContainer}>
        <button onClick={handleCopy} className={styles.copyButton}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className={styles.dockerfileContent}>
        <code>{dockerfileContent}</code>
      </pre>
    </div>
  );
};

export default DockerfilePreviewComponent;
