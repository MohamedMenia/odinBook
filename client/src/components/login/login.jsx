import { useState } from "react";
import React from "react";
//import { useHistory } from "react-router-dom";
import "./login.css";
import { FaRegWindowClose } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { BsLayoutWtf } from "react-icons/bs";

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surename, setSurename] = useState("");
  const [signupEmail, setsignupEmail] = useState("");
  const [signupPassword, setsignupPassword] = useState("");

  const [wrongEorP, setwrongEorP] = useState("none");
  const [blur, setblur] = useState({ filter: "none" });
  const [modal, setModal] = useState("none");
  const [modal2, setModal2] = useState("none");
  const [loginerr, setloginerr] = useState("");

  const myRef = React.createRef();
  // const history = useHistory();

  const handelsignupsubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstname,
      surename,
      email: signupEmail,
      password: signupPassword,
    };
    // console.log(user)
    try {
      let res = await fetch("http://localhost:8000/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      let result = res.status;
      console.log(result);
      if (result === 200) {
        myRef.current.setCustomValidity("");
        pop(e);
        pop2(e);
        setsignupEmail("");
        setsignupPassword("");
        setFirstname("");
        setSurename("");
      } else {
        myRef.current.setCustomValidity("this email already used");
      }
    } catch (err) {
      alert("server erorr");
    }
  };

  const handelloginsubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: loginEmail,
      password: loginPassword,
    };
    // console.log(user)
    try {
      let res = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      let result = res.status;
      if (result === 401) {
        let message = await res.json();
        setloginerr(message["message"]);
        setwrongEorP("flex");
        setLoginPassword("");
      } else window.location.reload(false);
    } catch (err) {
      alert("server erorr");
    }
  };

  function pop(e) {
    e.preventDefault();

    if (modal === "block") {
      setModal("none");
      setblur({ filter: "none" });
    } else {
      setModal("block");
      setblur({ filter: "blur(2px)", pointerEvents: "none" });
    }
  }
  function pop2(e) {
    e.preventDefault();

    if (modal2 === "block") {
      setModal2("none");
      setblur({ filter: "none" });
    } else {
      setModal2("block");
      setblur({ filter: "blur(2px)", pointerEvents: "none" });
    }
  }

  return (
    <div className="container">
      <h1 id="head" style={blur}>
        <BsLayoutWtf id="odinicon" />
        Odinbook
      </h1>
      <form style={blur} className="loginForm" onSubmit={handelloginsubmit}>
        <div className="wrongEorP" style={{ display: wrongEorP }}>
          {loginerr}
        </div>
        <input
          autoComplete="email"
          placeholder="Email"
          type="email"
          value={loginEmail}
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={loginPassword}
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
          required
        />
        <button className="btn-login" type="submit">
          Log In
        </button>
        <button onClick={(e) => pop(e)} className="btn-newaccount">
          Creat new account
        </button>
      </form>

      <div className="box" style={{ display: modal }}>
        <div className="boxhead">
          <i id="icon" onClick={(e) => pop(e)}>
            <FaRegWindowClose />
          </i>
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handelsignupsubmit}>
          <div className="nameinput">
            <input
              id="firstnameinput"
              placeholder="Firstname"
              type="text"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              value={firstname}
              required
            />
            <input
              id="surename"
              placeholder="Surename"
              type="text"
              onChange={(e) => {
                setSurename(e.target.value);
              }}
              value={surename}
              required
            />
          </div>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => {
              e.target.setCustomValidity("");

              setsignupEmail(e.target.value);
            }}
            value={signupEmail}
            ref={myRef}
            required
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setsignupPassword(e.target.value);
            }}
            value={signupPassword}
            required
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            // title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
          />

          <button className="btn-newaccount" type="submit">
            Sgin Up
          </button>
        </form>
      </div>
      <div className="box" style={{ display: modal2 }}>
        <BsCheckCircle id="CheckCircle" />
        <h3>your account has been succeessfully created</h3>
        <button id="btn-continue" onClick={pop2}>
          continue
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
