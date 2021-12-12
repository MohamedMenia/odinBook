//import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginForm from "./components/login/login";
import Home from "./components/home/home.jsx";
function App() {
  const [user, setUser] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [reloaduser, setReloaduser] = useState(0);


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
          setUser(userData);
        }
      });
  }, [reloaduser]);
  return (
    <div>
      {!isPending && user && <Home user={user} reloaduser={reloaduser}setReloaduser={setReloaduser} />}
      {!isPending && !user && <LoginForm />}
    </div>
  );
}

export default App;
