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
    <div className="AppUrlText">Url :</div>
    <div className="AppUrl"><a href={props.url} target="_blank">{props.url}</a></div>
  </div>
);

export default AppsCard;
