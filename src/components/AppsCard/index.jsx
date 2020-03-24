import React from 'react';

import './AppsCard.css';
import Status from '../Status';
import { Link } from 'react-router-dom';

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
    <Link to={props.url}><div className="AppUrl">{props.url}</div></Link>
  </div>
);

export default AppsCard;
