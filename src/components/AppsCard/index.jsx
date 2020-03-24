import React from 'react';

import './AppsCard.css';

const AppsCard = (props) => (
  <div className="AppCard">
    <div className="AppCardHeader">
      <table className="AppTable">
        <tr>
          <td>Flask</td>
          <td>Status</td>
        </tr>
      </table>
    </div>
    <div className="AppUrl">Url</div>
  </div>
);

export default AppsCard;
