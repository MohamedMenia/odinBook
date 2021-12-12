import "./navbar.css";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { BsLayoutWtf } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

function Navbar({ handelSearch, user }) {
  const [searchStr, setsearchStr] = useState("");

  let history = useHistory();

  let handelSubmit = (e) => {
    e.preventDefault()

    history.push(`/search/${searchStr}`);
  };

  return (
    <nav className='navbar'>
      <BsLayoutWtf className='odinicon' />
      <h1> Odinbook</h1>

      <form className='searchBar' onSubmit={handelSearch}>
        <input
          placeholder='   Search...'
          onChange={(e) => {
            setsearchStr(e.target.value);
          }}
        />
        <button type='submit' onClick={handelSubmit}>
          <BsSearch type='submit' />
        </button>
      </form>

      <div className='links'>
        <Link to='/'>Home </Link>
        <Link to='/profile'>
          {user.firstname} {user.surename}
        </Link>
        <Link to='/friends'>friends </Link>
        <button>Log Out</button>
      </div>
    </nav>
  );
}

export default Navbar;
