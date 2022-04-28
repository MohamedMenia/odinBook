import "./profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { getimg } from "../../functions/getImg";
import Posts from "../posts/posts";
function Profile({ logedUser }) {
  const [isPending, setIsPending] = useState(true);
  let [friendStatus, setFriendStatus] = useState({ friendStatus: null });
  let reqEmail = useParams();
  let [posts, setPosts] = useState([]);
  let [map, setMap] = useState({});

  const [user, setUser] = useState({
    firstname: null,
    img: null,
    bio: null,
    _id: null,
    surename: null,
    facebookURL: null,
    twitterURL: null,
    instgramURL: null,
    friendStatus: null,
  });
  useEffect(() => {
    if (reqEmail["email"] === logedUser.email) {
      setMap(logedUser.map);
      setPosts(logedUser.posts);
      setUser(logedUser);
      setIsPending(false);
    } else {
      fetch(`http://localhost:8000/profile/${reqEmail["email"]}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setUser(result.user);
          setFriendStatus(result.friend);
          setPosts(result.posts);
          setMap(result.map);
          setIsPending(false);
        });
    }
  }, [logedUser, reqEmail]);

  const navigate = useNavigate();
  const handelEditProfile = () => {
    navigate("/profileEdit");
  };
  let handelFriend = async () => {
    let friendholder = friendStatus.friendStatus;
    setFriendStatus({ friendStatus: "loading" });
    let res = await fetch("http://localhost:8000/addFriendREQ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        people: user._id,
        friendStatus: friendholder,
      }),
      credentials: "include",
    });
    res = await res.json();
    setFriendStatus({ friendStatus: res });
  };

  return (
    <div className="profileBody">
      {isPending && <p>loading...</p>}
      {!isPending && (
        <div className="grid">
          <div className="profileHeader">
            <img id="profilePicture" alt="" src={getimg(user)} />
            <div>
              <p id="username">
                {user.firstname} {user.surename}
              </p>
              <span>{user.bio}</span>
            </div>
            {logedUser.email !== user.email && (
              <button className="frindAndEditProfileBtn" onClick={handelFriend}>
                {friendStatus.friendStatus}
              </button>
            )}
            {logedUser.email === user.email && (
              <button
                className="frindAndEditProfileBtn"
                onClick={handelEditProfile}
              >
                <FaEdit />
                Edit profile
              </button>
            )}
          </div>
          <div className="profileLinks">
            {user.facebookURL && (
              <a id="facebook" href={user.facebookURL}>
                <BsFacebook />
              </a>
            )}
            {user.twitterURL && (
              <a id="twitter" href={user.twitterURL}>
                <BsTwitter />
              </a>
            )}
            {user.instgramURL && (
              <a id="insta" href={user.instgramURL}>
                <BsInstagram />
              </a>
            )}
          </div>
          <Posts
            logedUser={logedUser}
            posts={posts}
            setPosts={setPosts}
            map={map}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
