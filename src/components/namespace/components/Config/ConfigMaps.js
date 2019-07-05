import React, { Component } from 'react';

class ConfigMaps extends Component {
    constructor() {
        super();
            this.state = {
            apiData: []
        }
    }

    getData = ({ resources }) => {
        const data = resources;
        this.setState({ apiData: data });
        return this.state.apiData[0].toString();
    }

    renderapiData = () => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const api = 'http://54.84.186.47:31765/resources/';
        fetch(proxyUrl + api)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.getData(data);
        })
        .catch(() => console.log("Can't access " + api + " response. Blocked by browser?"));
    }

    render() {
        this.renderapiData();
        return (
            <div>
                TODO: Config Maps component
            </div>
        );
    }
}

export default ConfigMaps;