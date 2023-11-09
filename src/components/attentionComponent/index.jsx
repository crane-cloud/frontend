import React from "react";
import "./attentionComponent.css";

const AttentionComponent = () => {
  return (
    <div className="attentionNotice">
      <span className="attentionNoticeHeading">Important:</span> To ensure
      seamless deployment for both Mac M1 chip and AMD-based systems generated
      images on Crane Cloud, use the following command when building images:
      <br />
      <code className="commandFormatter">
        docker buildx build --platform linux/amd64 -t --myimage--:latest .
      </code>
    </div>
  );
};

export default AttentionComponent;
