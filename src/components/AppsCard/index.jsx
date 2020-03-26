import React from 'react';

import './AppsCard.css';
import Status from '../Status';

const AppsCard = (props) => {
  const { title, status, url } = props;

  return (
    <div className="AppCard">
      <div className="AppCardHeader">
        <table className="AppTable">
          <tr>
            <td>{title}</td>
            <td className="StatusData"><Status status={status} /></td>
          </tr>
        </table>
      </div>
      <div className="AppUrlText">Url :</div>
      <div className="AppUrl"><a target="_blank" rel="noopener noreferrer" href={url}>{url}</a></div>
    </div>
  );
};

export default AppsCard;
