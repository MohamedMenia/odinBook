//import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginForm from "./components/login/login";
import Home from "./components/home/home.jsx";
function App() {
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
          if (userData.img) {
            const buffer = userData.img.data.data;
            let b64 = Buffer.from(buffer).toString("base64");
            let mimeType = userData.img.contentType;
            userData["img"] = `data:${mimeType};base64,${b64}`;
          } else
            userData["img"] =
              "https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8";

          setUser(userData);
        }
      });
  }, [url]);
  return (
    <div>
      {!isPending && user && <Home user={user} setUser={setUser} />}
      {!isPending && !user && <LoginForm />}
    </div>
  );
}

export default App;
