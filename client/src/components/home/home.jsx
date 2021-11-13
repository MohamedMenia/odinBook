import { BrowserRouter as Router, Route } from "react-router-dom";
//import { useState } from "react";
import "./home.css";
import Navbar from "../navbar/navbar";
import Friends from "../friends/friends";
import SearchRes from "../searchRes/searchRes";
import Profile from "../profile/profile.jsx";

function Home({ user }) {
  return (
    <Router>
      <div className='flex'>
        <div className='head'>
          <Navbar user={user} />
        </div>
        <Route exact path='/'>
          <div className='body'>posts</div>
        </Route>
        <Route exact path='/profile'>
          <Profile user={user} />
        </Route>
        <Route exact path='/friends'>
          <Friends />
        </Route>
        <Route exact path='/search/:str'>
          <SearchRes />
        </Route>
      </div>
    </Router>
  );
}

export default Home;
