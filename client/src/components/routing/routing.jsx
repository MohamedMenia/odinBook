import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./routing.css";
import Navbar from "../navbar/navbar";
import Friends from "../friends/friends";
import SearchRes from "../searchRes/searchRes";
import Profile from "../profile/profile.jsx";
import ProfileEditor from "../profile/profileEditorModal/ProfileEditor";
import Home from "../home/home";
import LoginForm from "../login/login";
function Routing() {
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
        <div>
          <BrowserRouter>
            <Navbar user={user}setUser={setUser} />
            <div className="flex">
              <Routes>
                <Route path="/" element={<Home logedUser={user} setUser={setUser} />} />
                <Route
                  path="/profileEdit"
                  element={<ProfileEditor user={user} setUser={setUser} />}
                />
                <Route path="/friends" element={<Friends />} />
                <Route path="/search/:str" element={<SearchRes />} />
                <Route
                  path="/profile/:email"
                  element={<Profile logedUser={user} />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default Routing;
