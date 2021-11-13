import "./profile.css";
//import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

//import ProfileEditor from './profileEditorModal/ProfileEditor'
//<ProfileEditor user={user}/>
function Profile(user) {
  user = user.user;
  return (
    <div className='profileBody'>
      <div className='grid'>
        <img id='profilePicture' alt='' src={user.img} />
        <div className='username+bio'>
          <p id='username'>
            {user.firstname} {user.surename}
          </p>
          <p>{user.bio}</p>
        </div>
        <div className='editProfileBtn'>
          <button>
            {" "}
            <FaEdit />
            Edit profile
          </button>
        </div>
        <div className='profileLinks'>
          {user.facebookURL && (
            <a id='facebook' href={user.facebookURL}>
              <BsFacebook />
              {user.facebookURL.slice(25, user.facebookURL.length)}
            </a>
          )}
          {user.twitterURL && (
            <a id='twitter' href={user.twitterURL}>
              <BsTwitter />
              {user.twitterURL.slice(24, user.twitterURL.length)}
            </a>
          )}
          {user.instgramURL && (
            <a id='insta' href={user.instgramURL}>
              <BsInstagram />
              {user.instgramURL.slice(26, user.instgramURL.length)}
            </a>
          )}
        </div>
        <div className='profilePostes'>
          <p>postes</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
