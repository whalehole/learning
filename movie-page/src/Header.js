import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

function Logo(props) {
    return (
        <div>
            <img id="logo" src="logo.png" alt="logo.png" />
        </div>
    )
}

function Navigation(props) {
    return (
        <div id="navigation">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="donate.html">Donate</a>
        </div>
    )
}


class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Logo />
                <Navigation />
            </div>
        )
    }
}

export default Header