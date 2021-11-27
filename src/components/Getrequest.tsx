import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import axios from 'axios';
//import { IState as Props } from "../App";

class GetRequest extends React.Component 
    {
    componentDidMount() {
        // Simple GET request using fetch
        fetch('https://api.npms.io/v2/search?q=react')
            .then(response => response.json())
            .then(data => this.setState({ totalReactPackages: data.total }));
    }

    render() {
        const  totalReactPackages = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Simple GET Request</h5>
                <div className="card-body">
                    Total react packages: {totalReactPackages}
                </div>
            </div>
        );
    }
}


export default GetRequest;
