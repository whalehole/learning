import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

class HeaderPanelRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
    }
    logIn() {
        $.get("data/registeredUsersList.json", (data)=>{
            data.map((userLogIn)=>{
                if (userLogIn.userEmail == $("#exampleInputEmail1").val() && userLogIn.userPassword == document.getElementById("exampleInputPassword1").value) {
                    localStorage.setItem("BUMuserEmail", $("#exampleInputEmail1").val())
                    localStorage.setItem("BUMuserPassword", document.getElementById("exampleInputPassword1").value)
                    localStorage.setItem("BUMloggedInSession", "active")
                    this.userNickName = userLogIn.nickname 
                    if (document.getElementById("stayLoggedIn").checked == true) {
                        localStorage.setItem("BUMstayLoggedIn", "yes")
                        this.setState({loggedIn: true})
                    }
                    else {
                        localStorage.setItem("BUMstayLoggedIn", "no")
                        this.setState({loggedIn: true})
                    }
                }
                else {
                    let errorMessage = (
                        <p class="text-danger">You have entered wrong email and password.</p>
                    )
                    ReactDOM.render(errorMessage, document.getElementById("errorMessageLogIn"))
                    $("#exampleInputEmail1").val("")
                    $("#exampleInputPassword1").val("")
                    this.setState({loggedIn: false})
                }
            })
        }, "json")
    }
    render() {
            // modals
            let loggedInModal
            if (this.state.loggedIn == false) {
                loggedInModal = (
                    <div class="modal fade" id="signInModal" aria-labelledby="signInModal" tabIndex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Welcome back :)</h5>
                                    <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">
                                    <div id="errorMessageLogIn"></div>
                                    <form>
                                        <div class="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                            <small id="emailHelp" class="form-text text-muted"></small>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" class="form-control" id="exampleInputPassword1"></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input type="checkbox" class="form-check-input" id="stayLoggedIn" value="yes"></input>
                                            <label class="form-check-label" htmlFor="stayLoggedIn">Stay logged in</label>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" data-dismiss="modal" class="btn btn-secondary">Close</button>
                                    <button type="button" onClick={()=>this.logIn()} class="btn btn-primary">Sign in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } 
            else if (this.state.loggedIn == true) {
                loggedInModal = (
                    <div class="modal fade" id="signInModal2" aria-labelledby="signInModal2" tabIndex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Great news!</h5>
                                    <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">
                                    <h5 >You have successfully entered danger zone.</h5>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" data-dismiss="modal" class="btn btn-secondary">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            // panel
            if (this.state.loggedIn == false) {
                if (localStorage.getItem("BUMstayLoggedIn") == "yes") {
                    $.get("data/registeredUsersList.json", (data)=>{
                        data.map((userLogIn)=>{
                            if (userLogIn.userEmail == localStorage.getItem("BUMuserEmail") && userLogIn.userPassword == localStorage.getItem("BUMuserPassword")) {
                                this.userNickName = userLogIn.nickname
                            }
                        })
                    }, "json").then(()=>{
                        this.setState({loggedIn: true});
                    })
                }
            }
            let panel
            if (this.state.loggedIn == true) {
                panel = (
                    <div id="userPanel">
                        <div id="userPanel1" class="dropdown">
                            <button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.userNickName}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href={window.location.href} onClick={()=>{localStorage.setItem("BUMstayLoggedIn", "no"); localStorage.setItem("BUMloggedInSession", "inactive"); this.setState({loggedIn: false});}}>Sign out</a>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                panel = (
                    <div id="guestPanel">
                        <button type="button" data-toggle="modal" data-target="#signInModal" class="btn btn-outline-success">Sign in</button>
                        <button type="button" class="btn btn-outline-success"  data-target="#applyModal" data-toggle="modal">Apply</button>
                    </div>
                )
            }
    return (
        <div id="panelSwitch">
            {panel}

            {loggedInModal}

            <div class="modal fade" id="applyModal" aira-labelledby="applyModal" tabIndex="-1" aira-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Join us. No play alone anymore ;)</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="form-group" class="col">
                                        <label htmlFor="exampleInputFirstName1">First name</label>
                                        <input type="text" class="form-control" id="exampleInputFirstName1" aria-describedby="firstNameHelp"></input>
                                    </div>
                                    <div class="form-group" class="col">
                                        <label htmlFor="exampleInputLastName1">Last name</label>
                                        <input type="text" class="form-control" id="exampleInputLastName1" aria-describedby="lastNameHelp"></input>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="exampleInputEmail2">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"></input>
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="exampleInputNickname1">Nickname</label>
                                    <input type="text" class="form-control" id="exampleInputNickname1" aria-describedby="nicknameHelp"></input>
                                    <small id="nicknameHelp" class="form-text text-muted">How shall we call you?</small>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="exampleInputPassword2">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword2"></input>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="exampleInputConfirmPassword2">Confirm password</label>
                                    <input type="password" class="form-control" id="exampleInputComfirmPassword2"></input>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-secondary">Close</button>
                            <button type="button" class="btn btn-primary">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    }
}

export default HeaderPanelRight