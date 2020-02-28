import React from 'react';
import './TableList.css';

class TableList extends React.Component {
    
    constructor(props){
      super(props);
      // this.getHeader = this.getHeader.bind(this);
      this.getRowsData = this.getRowsData.bind(this);
      // this.getKeys = this.getKeys.bind(this);
    }
    
    // getKeys = function(){
    //   return Object.keys(this.props.data[0]);
    // }
    
    // getHeader = function(){
    //   // let keys = this.getKeys();
    //   return keys.map((key, index)=>{
    //     return <th key={key}>{key.toUpperCase()}</th>
    //   })
    // }
    
    getRowsData = function(){
      let items = this.props.data;
      // let keys = this.getKeys();
      let keys = ["Name", "Status", "Age"];
      return items.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
      })
    }
    
    render() {
        return (
          <div>
            <table>
            <thead>
              {/* <tr>{this.getHeader()}</tr> */}
            </thead>
            <tbody>
              {this.getRowsData()}
            </tbody>
            </table>
          </div>
          
        );
    }
}

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}
export default TableList;