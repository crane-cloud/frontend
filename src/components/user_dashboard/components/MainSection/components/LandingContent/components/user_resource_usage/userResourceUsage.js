import React , { Component } from "react";
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';

import "./userResource.css";

export default class UserResourceUsage extends Component{
    
    render(){
        let data = {
            labels: ["Jan", "Feb", "Apr", "May", "Jun", 'Jul', "Aug"],
            datasets: [{
                label: "Resource Usage",
                backgroundColor: 'rgb(30,144,255)',
                borderColor: 'rgb(30,144,255)',
                data: [10,20,60,80,5,2,70],
            }]
        };


        return (<div class="row user-resource">
            <div class="col-9 text-center my-5 mx-auto">
                <h5 class="mb-5">Total Bill : UGX 3,274,578</h5>
                <Line data={data} />
            </div>
        </div>);
    }
}