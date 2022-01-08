import "./profile.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt, FaEdit } from "react-icons/fa";

function Profile({ mainUser }) {
  const [isPending, setIsPending] = useState(true);
  let [friendStatus, setFriendStatus] = useState({ friendStatus: null });
  let reqEmail = useParams();
  let [posts, setPosts] = useState([]);
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
    if (reqEmail["email"] === mainUser.email) {
      setPosts(mainUser.posts);
      setUser(mainUser);
      setIsPending(false);
    } else {
      fetch(`/profile/${reqEmail["email"]}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setUser(result[0]);
          setFriendStatus(result[1]);
          setPosts(result[0].posts);
          setIsPending(false);
        });
    }
  }, [mainUser, reqEmail]);
  let handelLikes = async (postID, PostWriterID, likeStates) => {
    let result = await fetch(`/LikeAndUnlike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postID, PostWriterID, likeStates }),
      credentials: "include",
    });
    result = await result.json();
    setPosts(result);
  };
  function getimg(user) {
    if (user.img) {
      const buffer = user.img.data.data;
      let b64 = Buffer.from(buffer).toString("base64");
      let mimeType = user.img.contentType;
      return `data:${mimeType};base64,${b64}`;
    } else
      return "https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8";
  }

  const history = useHistory();
  const handelEditProfile = () => {
    history.push("/profileEdit");
  };
  let handelFriend = async () => {
    let friendholder = friendStatus.friendStatus;
    setFriendStatus({ friendStatus: "loading" });
    let res = await fetch("/addFriendREQ", {
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
    <div className='profileBody'>
      {isPending && <p>loading...</p>}
      {!isPending && (
        <div className='grid'>
          <div className='profileHeader'>
            <img id='profilePicture' alt='' src={getimg(user)} />
            <div>
            <p id='username'>
              {user.firstname} {user.surename}
            </p>
            <span>{user.bio}</span>
            </div>
            {mainUser.email !== user.email && (
              <button className='frindAndEditProfileBtn' onClick={handelFriend}>
                {friendStatus.friendStatus}
              </button>
            )}
            {mainUser.email === user.email && (
                <button className='frindAndEditProfileBtn' onClick={handelEditProfile} >
                  <FaEdit />
                  Edit profile
                </button>
            )}
          </div>
          <div className='profileLinks'>
            {user.facebookURL && (
              <a id='facebook' href={user.facebookURL}>
                <BsFacebook />
              </a>
            )}
            {user.twitterURL && (
              <a id='twitter' href={user.twitterURL}>
                <BsTwitter />
              </a>
            )}
            {user.instgramURL && (
              <a id='insta' href={user.instgramURL}>
                <BsInstagram />
              </a>
            )}
          </div>
          {posts.map((post) => {
            let likeColor = { color: "#444950" };
            let likeStates = "Like";
            for (let i = 0; i < post.likes.length; i++) {
              if (post.likes[i] === mainUser._id) {
                likeStates = "UnLike";
                likeColor = { color: "#0577db" };
                break;
              }
            }
            return (
              <div className='profilePosts' key={post._id}>
                <div className='profilePostImgPublisher'>
                  <div>
                    <img alt='' src={getimg(user)} />
                  </div>
                  <div className='postsPublisherAndDate'>
                    <span>{user.firstname + " " + user.surename}</span>
                    <span id='postDate'>{post.createdAt}</span>
                  </div>
                </div>
                <div className='postContent'>
                  <span>{post.content}</span>
                  <span id='likes'>
                    <AiFillLike /> {post.likes.length}
                  </span>
                  <hr />
                </div>
                <div className='likeComment'>
                  <span
                    style={likeColor}
                    onClick={() => handelLikes(post._id, user._id, likeStates)}>
                    <AiOutlineLike /> &nbsp; {likeStates}
                  </span>
                  <span>
                    <FaRegCommentAlt /> &nbsp; comment
                  </span>
                </div>
                <div className='comment'>
                  <input id='comment' placeholder='  write a comment...' />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
