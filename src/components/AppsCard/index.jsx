import React from 'react';
import DotsImg from '../../assets/images/3dots.svg';

import './AppsCard.css';
import Status from '../Status';

const AppsCard = (props) => {
  const { name, status, url } = props;

  return (
    <div className="AppCard">
      <div className="AppCardHeader">
        <table className="AppTable">
          <tr>
            <td className="AppName">{name}</td>
            <td className="OtherData">
              <div className="StatusData">
                <Status status={status} />
                <img src={DotsImg} alt="three dots" />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div className="AppUrlText">Url :</div>
      <div className="AppUrl"><a target="_blank" rel="noopener noreferrer" href={url}>{url}</a></div>
    </div>
  );
};

export default AppsCard;
