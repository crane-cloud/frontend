import React from "react";
import "./StatusGraph.css";

const StatusGraph = () => {
  const boxCount = 30;
  const boxData = Array.from({ length: boxCount }, (_, index) =>
    index % 2 === 0 ? "green" : "red"
  );

  return (
    <>
      <div className="SeriesCardArea">
        <div className="SeriesCard">
          <div className="SeriesTopRow">
            <span className="SeriesTitle">Crane Cloud Application</span>
            <span>Operational</span>
          </div>
          <div className="horizontal-card">
            {boxData.map((boxColor, index) => (
              <div key={index} className={`box ${boxColor}`}></div>
            ))}
          </div>
          <div className="SeriesBottomRow">
            <span>30 days ago</span>
            <hr className="RowDivider" />
            <span>Today</span>
          </div>
        </div>
      </div>

      <div className="SeriesCardArea">
        <div className="SeriesCard">
          <div className="SeriesTopRow">
            <span className="SeriesTitle">Databases</span>
            <span>Operational</span>
          </div>
          <div className="horizontal-card">
            {boxData.map((boxColor, index) => (
              <div key={index} className={`box ${boxColor}`}></div>
            ))}
          </div>
          <div className="SeriesBottomRow">
            <span>30 days ago</span>
            <hr className="RowDivider" />
            <span>Today</span>
          </div>
        </div>
      </div>

      <div className="SeriesCardArea">
        <div className="SeriesCard">
          <div className="SeriesTopRow">
            <span className="SeriesTitle">Mira Service</span>
            <span>Operational</span>
          </div>
          <div className="horizontal-card">
            {boxData.map((boxColor, index) => (
              <div key={index} className={`box ${boxColor}`}></div>
            ))}
          </div>
          <div className="SeriesBottomRow">
            <span>30 days ago</span>
            <hr className="RowDivider" />
            <span>Today</span>
          </div>
        </div>
      </div>

      <div className="SeriesCardArea">
        <div className="SeriesCard">
          <div className="SeriesTopRow">
            <span className="SeriesTitle">Crane Cloud Registry</span>
            <span>Operational</span>
          </div>
          <div className="horizontal-card">
            {boxData.map((boxColor, index) => (
              <div key={index} className={`box ${boxColor}`}></div>
            ))}
          </div>
          <div className="SeriesBottomRow">
            <span>30 days ago</span>
            <hr className="RowDivider" />
            <span>Today</span>
          </div>
        </div>
      </div>

      <div className="SeriesCardArea">
        <div className="SeriesCard">
          <div className="SeriesTopRow">
            <span className="SeriesTitle">Clusters</span>
            <span>Issues detected</span>
          </div>
          <div className="horizontal-card">
            {boxData.map((boxColor, index) => (
              <div key={index} className={`box ${boxColor}`}></div>
            ))}
          </div>
          <div className="SeriesBottomRow">
            <span>30 days ago</span>
            <hr className="RowDivider" />
            <span>Today</span>
          </div>
        </div>
      </div>

      <div className="SeriesCardArea">
        <div className="SeriesCard">
          <div className="SeriesTopRow">
            <span className="SeriesTitle">Prometheus</span>
            <span>Operational</span>
          </div>
          <div className="horizontal-card">
            {boxData.map((boxColor, index) => (
              <div key={index} className={`box ${boxColor}`}></div>
            ))}
          </div>
          <div className="SeriesBottomRow">
            <span>30 days ago</span>
            <hr className="RowDivider" />
            <span>Today</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusGraph;
