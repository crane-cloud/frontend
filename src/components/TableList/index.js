import React from 'react';
import './TableList.css';

class TableList extends React.Component {
    
    constructor(props){
      super(props);
      this.getHeader = this.getHeader.bind(this);
      this.getRowsData = this.getRowsData.bind(this);
    }
    
    getHeader = function(){
      return this.props.headers.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
      })
    }
    
    
    getRowsData = function(){
      return this.props.namespaces.map((row, index)=>{
        return <tr key={row}><td className="Name">{row.metadata.name}</td></tr>
      })
    }
    
    render() {
        return (
          <div>
            <table>
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>
              {/* {this.getRowsData()} */}
            </tbody>
            </table>
          </div>
          
        );
    }
}

export default TableList;