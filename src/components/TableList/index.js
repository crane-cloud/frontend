import React from 'react';
import './TableList.css';

const TableList = (props) => (
    <div className="TableDiv">
      <div className="CardHeader">{props.title}</div>
      <div className="ResourceDigit"><h1>{props.resourceCount}</h1></div>
    </div>
  )

export default TableList;