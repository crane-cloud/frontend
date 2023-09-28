import React from "react";
import "./StatusGraph.css";
import Tooltip from "../Tooltip";
import {
  formatTimestamp,
  getStatusColor,
  getStatusValueByKey,
  toSentenceCase,
} from "../../helpers/statusGraphUtils";

const StatusGraph = ({ status, data }) => {
  return (
    <div className="SeriesCardArea">
      {data.map(({ key, value }) => (
        <div key={key} className="SeriesCard">
          <div className="SeriesTopRow">
            <span className="SeriesTitle">{toSentenceCase(key)}</span>
            <span>
              {getStatusValueByKey(key, status) === "success"
                ? "Operational"
                : "Issues Detected"}
            </span>
          </div>
          <div className="horizontal-card">
            {Object.entries(value).map(([serviceName, serviceData]) => (
              <div key={serviceName} className="ServiceGraph">
                <div className="ServiceTitle">
                  {toSentenceCase(serviceName)}
                </div>
                <hr />
                <div className="ServiceGraphBoxes">
                  {serviceData.map((dataItem, index) => (
                    <>
                      <Tooltip
                        showIcon={false}
                        keyword={
                          <div
                            key={index}
                            className={`box ${getStatusColor(dataItem.status)}`}
                          ></div>
                        }
                        message={`${formatTimestamp(dataItem.timestamp)} - ${
                          dataItem.status === "success"
                            ? "Service Available"
                            : "Issues Detected"
                        }`}
                        position="bottom"
                      ></Tooltip>
                    </>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="SeriesBottomRow">
            <span>30 days ago</span>
            <hr className="RowDivider" />
            <span>Today</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusGraph;
