import React , { Component } from "react";


export default class DeploymentRow extends Component{
    
    render(){
        return (
            <div class="row">
                <div class="col-6  mb-5">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4> Storage </h4>
                            <p> { this.props.deployment.storage } used</p>
                        </div>
                    </div>
                </div>

                <div class="col-6  mb-5">
                    <div class="card">
                        <div class="card-body text-center ">
                            <h4> CPU cycles </h4>
                            <p> average { this.props.deployment.cpuCycles } cores used</p>
                        </div>
                    </div>
                </div>

                <div class="col-6  mb-5">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4> Memory Consumption </h4>
                            <p> average { this.props.deployment.memory } used</p>
                        </div>
                    </div>
                </div>

                <div class="col-6  mb-5">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4> Bandwidth </h4>
                            <p> average { this.props.deployment.bandWidth } used</p>
                        </div>
                    </div>
                </div>

            </div>
         );
    }
}