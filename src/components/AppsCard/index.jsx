import React from 'react';

import './AppsCard.css';
import Status from '../Status';

const AppsCard = (props) => (
  <div className="AppCard">
    <div className="AppCardHeader">
      <table className="AppTable">
        <tr>
          <td>{props.title}</td>
          <td className="StatusData"><Status status={props.status} /></td>
        </tr>
      </table>
    </div>
    <div className="AppUrl">{props.url}</div>
  </div>
);

export default AppsCard;
