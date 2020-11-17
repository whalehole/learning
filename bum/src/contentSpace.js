import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';




// content 1; blog feed
class BlogFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {numberOfBlogs: 3, order: "Most recent"}
    }
    moreBlogs() {
        let totalBlogs = this.state.numberOfBlogs + 3
        this.setState({numberOfBlogs: totalBlogs})
        $.ajax({
            // fetching more blogs
            method: "GET",
            dataType: "json",
            url: "data/blogContent.json",
            success: data => {
                data.reverse().slice(this.state.numberOfBlogs - 3,this.state.numberOfBlogs).map(blog => {
                // displaying more blogs on page
                let blogContainer = document.createElement("DIV")
                document.getElementById("blogFeed").appendChild(blogContainer)
                let blogEntry = document.createElement("DIV")
                blogContainer.appendChild(blogEntry)
                let blogDetails = (
                    <div class="rounded">
                        <p class="lead">{blog.title}</p>
                        <p class="lead"><small class="text-muted">{blog.dateReleased}</small></p>
                        <figure class="figure">
                            <img src={blog.media} class="figure-img rounded" alt="blogImage"></img>
                            <figcaption class="figure-caption">{blog.someWords}</figcaption>
                        </figure>
                    </div>
                )
                ReactDOM.render(blogDetails, blogEntry)
                })
            }
         })
    }

    componentDidMount() {
        // fetching blogs
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "data/blogContent.json",
            success: data => {
                data.reverse().slice(0,3).map(blog => {
                // displaying blogs on page
                let blogContainer = document.createElement("DIV")
                document.getElementById("blogFeed").appendChild(blogContainer)
                let blogEntry = document.createElement("DIV")
                blogContainer.appendChild(blogEntry)
                let blogDetails = (
                    <div class="rounded">
                        <p class="lead">{blog.title}</p>
                        <p class="lead"><small class="text-muted">{blog.dateReleased}</small></p>
                        <figure class="figure">
                            <img src={blog.media} class="figure-img rounded" alt="blogImage"></img>
                            <figcaption class="figure-caption">{blog.someWords}</figcaption>
                        </figure>
                    </div>
                )
                ReactDOM.render(blogDetails, blogEntry)
                })
            }
         })
    }
     render() {
         return(
             <div>
                <div id="blogFeed">

                </div>
                <div id="moreBlogs">

                </div>
                <button onClick={() => this.moreBlogs()}>Click for more</button>
            </div>
         )
     }
}

// content 2; members
class MembersList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // fetching info of members
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "data/membersInfo.json",
            success: data => {
                data.map((user) => {
                    // displaying info on page
                     let userInfo = document.createElement("TR")
                     document.getElementById("membersList").appendChild(userInfo)
                     let userName = document.createElement("TD")
                     userName.append(user.username)
                     let dateJoined = document.createElement("TD")
                     dateJoined.append(user.dateJoined)
                     let role = document.createElement("TD")
                     role.append(user.role)
                     let gamesPlaying = document.createElement("TD")
                     gamesPlaying.append(user.gamesPlaying)
                     userInfo.appendChild(userName)
                     userInfo.appendChild(dateJoined)
                     userInfo.appendChild(role)
                     userInfo.appendChild(gamesPlaying)
                })
            }
        })
    }

    render() {
        return (
            <table class="table table-bordered table-light">
                <thead class="thead-dark" id="membersList">
                    <tr>
                        <th>Name</th>
                        <th>Joined</th>
                        <th>Role</th>
                        <th>Games</th>
                    </tr>
                </thead>
            </table>
        )
    }
}

// content 3; Join community form
class Apply extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let form = (
            <form>
                <div class="row">
                    <div class="form-group" class="col">
                        <label for="exampleInputFirstName1">First name</label>
                        <input type="text" class="form-control" id="exampleInputFirstName1" aria-describedby="firstNameHelp"></input>
                    </div>
                    <div class="form-group" class="col">
                        <label for="exampleInputLastName1">Last name</label>
                        <input type="text" class="form-control" id="exampleInputLastName1" aria-describedby="lastNameHelp"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputNickname1">Nickname</label>
                    <input type="text" class="form-control" id="exampleInputNickname1" aria-describedby="nicknameHelp"></input>
                    <small id="nicknameHelp" class="form-text text-muted">How shall we call you?</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"></input>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        )
        ReactDOM.render(form, document.getElementById("joinCommunityForm"))
    }

    render() {
        return (
            <div id="joinCommunityForm">

            </div>
        )
    }

}

// all content
class ContentSpace extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Router>
                <div>
                    {/* navigation */}
                    <nav id="navBar" class="navbar navbar-expand-lg rounded">
                        <Link class="nav-link" to="/home">Home</Link>
                        <Link class="nav-link" to="/members">Members</Link>
                        <Link class="ml-auto" to="/signin"><button type="button" class="btn btn-outline-success">Sign in</button></Link>
                        <Link to="/apply"><button type="button" class="btn btn-outline-success">Apply</button></Link>
                    </nav>
                    {/* content */}
                    <div>
                        <Route exact path="/">
                            <BlogFeed />
                        </Route>
                        <Route path="/home">
                            <BlogFeed />
                        </Route>
                        <Route exact path="/members">
                            <MembersList />
                        </Route>
                        <Route path="/apply">
                            <Apply />
                        </Route>
                    </div>
                </div>
            </Router>
        )
    }
}   

export default ContentSpace