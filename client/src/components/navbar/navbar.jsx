import "./navbar.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { BsLayoutWtf } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

function Navbar({ handelSearch, user,setUser }) {
  const [searchStr, setsearchStr] = useState("");

  const navigate = useNavigate();

  let handelSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchStr}`);
  };
  let handelLogout = async() => {
    let res = await fetch("http://localhost:8000/logout/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    let result = res.status;
    if(result===200)setUser(null);
    else alert("server erorr");

    };

  return (
    <nav className="navbar">
      <BsLayoutWtf className="odinicon" />
      <h1> Odinbook</h1>

      <form className="searchBar" onSubmit={handelSearch}>
        <input
          placeholder="   Search..."
          onChange={(e) => {
            setsearchStr(e.target.value);
          }}
        />
        <button type="submit" onClick={handelSubmit}>
          <BsSearch type="submit" />
        </button>
      </form>

      <div className="links">
        <Link to="/">Home </Link>
        <Link to={`/profile/${user.email}`}>
          {user.firstname} {user.surename}
        </Link>
        <Link to="/friends">Friends </Link>
        <button onClick={handelLogout}>Log Out</button>
      </div>
    </nav>
  );
}

export default Navbar;
