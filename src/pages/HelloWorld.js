import React, { Component } from 'react';
import Clock from './Demo/Clock';

// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>;
// }

class Welcome extends React.Component {
    componentDidMount() {
        
    }

    
    render() {
        return <h1>Hello, {this.props.name}<div>{this.props.children}</div></h1>;
    }
}




export default () => {

    const conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g, '/');
    };

    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
        <li>{number}</li>
    );

    return (
        <Welcome name="king1" title="asf">
            <div>
                <h1>{conversionPath("////hello")}</h1>
                <Clock/>
            </div>
        </Welcome>
        // <div>
        //     <h1>hello</h1>
        //     <ul>{listItems}</ul>
        // </div>
    );
}