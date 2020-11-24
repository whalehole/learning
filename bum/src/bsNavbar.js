import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch
} from 'react-router-dom';
import $ from 'jquery';

class BsNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>
                <nav class="navbar navbar-light bg-light navbar-expand-lg justify-content-between">
                    <div class="navbar-nav">
                        <Link to="/home" class="navbar-brand">
                            <img src="guildAssets/1.png" width="60" height="60" class="d-inline-block align-top rounded" alt="" loading="lazy" />
                        </Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <Link class="nav-link" to="/home">Home <span class="sr-only">(current)</span></Link>
                                </li>
                                <li class="nav-item active">
                                    <Link class="nav-link" to="/blog">Blog</Link>
                                </li>
                                <li class="nav-item active">
                                    <Link class="nav-link" to="/members">Members</Link>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Forum</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </Router>
        )
    }
}

export default BsNavbar