import React, { Component } from 'react';

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
        fetch(proxyUrl + apiRoute)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.getData(data);
        })
        .catch(() => console.log("Can't access " + apiRoute));
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