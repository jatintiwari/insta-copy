import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./feed.css";
import Header from "./header.js";
import Footer from "./footer";
import Stories from "./stories.js";
import Feed from "./feed.js";
import Profile from "./Profile.js";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/**
 * 
 *  this is starting block of MyComponent *
 <MyComponent name={"avi"}>
 *  these are all children of MyComponent *
 <MyChildComponent /> {/*  this is custom component
 <div className="child">my component children</div> *  this is html element
 <div className="child">my component children</div>
 <div className="child">my component children</div>
 <div className="child">my component children</div>
 <div className="child">my component children</div>
 <div className="child">my component children</div>
 <div className="child">my component children</div>
 <div className="child">my component children</div>
</MyComponent>{" "}
**  this is end of block of MyComponent 
<div className="parent">
 <div className="child">div children</div>
 <div className="child">div children</div>
 <div className="child">div children</div>
 <div className="child">div children</div>
 <div className="child">div children</div>
 <div className="child">div children</div>
 <div className="child">div children</div>
 <div className="child">div children</div>
</div>
 */

function App() {
    return (
        <div className="main-container">
            <Router>
                <Header />
                {/*  this is starting block of Router */}
                <Switch>
                    {/* 
                this is child component of router which helps in switching 
                between the components via match the value of path
                */}
                    <Route path="/profile">
                        {/* 
                      this is router compnent which takes the prop path and matches the url
                      it activates only if the path matches.
                      if the path matches - it activate the enclosed child components
                    */}
                        <Profile />
                    </Route>
                    <Route path="/search">{"search"}</Route>
                    <Route path="/add">{"add"}</Route>
                    <Route path="/"> { /* this is a global and main path which match every window.location.pathname */}
                        <Stories />
                        <Feed />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
