import React, { Component } from 'react';
import axios from 'axios';

class ConfigMaps extends Component {
    constructor() {
        super();
            this.state = {
            apiData: []
        }
    }

    getData = ({ resources }) => {
        const [...data] = resources;
        return this.setState({ apiData: data });
    }

    renderapiData = () => {
        const apiRoute = 'http://54.84.186.47:31765/resources/';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        axios.get(proxyUrl + apiRoute)
        .then(response => {
            this.getData(response.data);
        })
        .catch(error => console.log("Can't access " + apiRoute, error))
        
    }

    render() {
        this.renderapiData();
        console.log(React.version);
        return (
            <div>
                TODO: Config Maps component
            </div>
        );
    }
}

export default ConfigMaps;