import React from 'react';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory';

const data = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 4 },
    { x: 4, y: 3 },
    { x: 5, y: 5 }
];


export default class Victory extends React.Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="col-4  my-4">
                <div className="card">
                    <div className="card-header text-center">
                        CPU USAGE
                    </div>
                    <div className="card-body">
                        
                        <VictoryChart polar={false} height={390} scale={ {x: "time"} }>
                            <VictoryLine
                                interpolation="linear" data={data}
                                style={{ data: { stroke: "#c43a31" } }}
                            />
                            <VictoryScatter data={data}
                                size={5}
                                style={{ data: { fill: "#c43a31" } }}
                            />
                        </VictoryChart>

                    </div>
                </div>
            </div>
        );
    }
}