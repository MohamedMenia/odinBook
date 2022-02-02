import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../navbar/navbar";
import Friends from "../friends/friends";
import SearchRes from "../searchRes/searchRes";
import Profile from "../profile/profile.jsx";
import ProfileEditor from "../profile/profileEditorModal/ProfileEditor";
import Posts from "../posts/posts";
import LoginForm from "../login/login";
function Home() {
  const [user, setUser] = useState("");
  const [isPending, setIsPending] = useState(true);

  const url = "http://localhost:8000/user";
  useEffect(() => {
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        if (userData === 404) {
          setUser("");
          setIsPending(false);
        } else {
          setIsPending(false);
          setUser({
            ...userData.user,
            posts: userData.posts,
            map: userData.map,
          });
        }
      });
  }, []);
  return (
    <div>
      {!isPending && !user && <LoginForm />}
      {!isPending && user && (
        <Router>
          <div className='flex'>
            <div className='head'>
              <Navbar user={user} />
            </div>
            <Route exact path='/'>
              <Posts />
            </Route>
            <Route exact path='/profileEdit'>
              <ProfileEditor
                user={user}
                setUser={setUser}
              />
            </Route>
            <Route exact path='/friends'>
              <Friends />
            </Route>
            <Route path='/search/:str'>
              <SearchRes />
            </Route>
            <Route exact path='/profile/:email'>
              <Profile mainUser={user} />
            </Route>
          </div>
        </Router>
      )}
    </div>
  );
}

export default Home;
