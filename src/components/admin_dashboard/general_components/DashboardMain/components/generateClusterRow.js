import React, { Component } from "react";

import ClusterCard from "./ClusterCard";


export default class GenerateClusterRow extends Component {
    array_of_clusters = [
        {
            cluster_id : 12,
            status : 'on',
            name : 'City square',
            errors : [ 
                {error: 'node off', error_id: 11 }, 
                {error: 'pod off', error_id: 12 }, 
                { error: '3 services down' , error_id: 13 }
            ],
            nameSpaces : [{name : 'chapRide', nameSpaceId: 45}, { name :'cityBank', nameSpaceId: 46 }, { name : 'easyBus', nameSpaceId : 47 }],
            date_of_creation : '2 years back',
            data: [0, 5, 0, 40, 20, 60, 10], /* these are for days, as in mon to sun, subject to change */
        },
        {
            cluster_id : 13,
            name : 'Makerere',
            status : 'off',
            errors : [ 
                {error: 'node off', error_id: 21 }, 
                {error: 'pod off', error_id: 22 }, 
            ],
            nameSpaces : [{ name :'COSIS', nameSpaceId : 24 }, { name: 'COBAMS', nameSpaceId : 25}, { name: 'VET', nameSpaceId : 26 }],
            date_of_creation : '2 months back',
            data: [0, 10, 20, 40, 50, 60, 43],
        },
        {
            cluster_id : 14,
            name : 'kenya',
            status : 'on',
            errors : [
                { error: '2 pod off', error_id : '31' }],
            nameSpaces : [{ name : 'high court', nameSpaceId : 67 }, { name : 'state house', nameSpaceId : 68 }],
            date_of_creation : '6 months back',
            data: [50, 10, 30, 0, 60, 70, 7],
        },
        {
            cluster_id : 15,
            name : 'Russia',
            status : 'off',
            errors : [],
            nameSpaces : [{name : 'uber', nameSpaceId : 98 }, { name : 'microsoft',  nameSpaceId : 99}],
            date_of_creation : '1 year back',
            data: [6, 30, 5, 20, 80, 90, 0], /* these are for days, as in mon to sun, subject to change */
        }
    ];

    render(){ 
        return (
            this.generateClusterRow() 
        );
    }

    generateClusterRow = () => {
        return (
            <div className="row">
                {
                   this.array_of_clusters.map((item) => {
                    return <ClusterCard cluster={ item } key={ item.cluster_id }/>;
                   }) 
                }
            </div>
        );
    }
}