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
        this.state = {numberOfBlogs: 3, totalNumberOfBlogs: "", order: "Most recent"}
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
    componentDidUpdate() {
        if (this.state.numberOfBlogs >= this.state.totalNumberOfBlogs) {
                $("#moreBlogsButton").attr("disabled", true)
                $("#moreBlogsButton").attr("class", "btn btn-secondary")
                $("#moreBlogsButton").html("You have reached the end, bud.")
        }
    }
    componentDidMount() {
        // fetching blogs
        $.ajax({
            method: "GET",
            dataType: "json",
            url: "data/blogContent.json",
            success: data => {
                this.setState({totalNumberOfBlogs: data.length})
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
                <div id="moreBlogsButtonContainer">
                    <button id="moreBlogsButton" class="btn btn-info" onClick={() => this.moreBlogs()}>Click for more</button>
                </div>
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
// Discord

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
                    <nav class="rounded navbar navbar-light bg-light navbar-expand-lg justify-content-between">
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
                                        <Link class="nav-link" to="/members">Members</Link>
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
                    {/* content */}
                    <div  id="content">
                        <Route exact path="/">
                            <BlogFeed />
                        </Route>
                        <Route exact path="/home">
                            <BlogFeed />
                        </Route>
                        <Route exact path="/members">
                            <MembersList />
                        </Route>
                    </div>
                </div>
            </Router>
        )
    }
}   

export default ContentSpace