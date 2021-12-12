import "./profile.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

function Profile(user) {
  let handelLikes=(postid)=>{
    console.log(postid)

  }
  user = user.user;
  let [postes, setPostes] = useState();
  let [IsPending, setIsPending] = useState(true);
  useEffect(() => {
    fetch(`/GETPosts`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setPostes(result);
        setIsPending(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    history.push("/profile/edit");
  };

  return (
    <div className='profileBody'>
      <div className='grid'>
        <img id='profilePicture' alt='' src={getimg(user)} />
        <div className='username+bio'>
          <p id='username'>
            {user.firstname} {user.surename}
          </p>
          <span>{user.bio}</span>
        </div>
        <div className='editProfileBtn' onClick={handelEditProfile}>
          <button>
            <FaEdit />
            Edit profile
          </button>
        </div>
        <div className='profileLinks'>
          {user.facebookURL && user.facebookURL !== "null" && (
            <a id='facebook' href={user.facebookURL}>
              <BsFacebook />
              {user.facebookURL.slice(25, user.facebookURL.length)}
            </a>
          )}
          {user.twitterURL && user.twitterURL !== "null" && (
            <a id='twitter' href={user.twitterURL}>
              <BsTwitter />
              {user.twitterURL.slice(24, user.twitterURL.length)}
            </a>
          )}
          {user.instgramURL && user.instgramURL !== "null" && (
            <a id='insta' href={user.instgramURL}>
              <BsInstagram />
              {user.instgramURL.slice(26, user.instgramURL.length)}
            </a>
          )}
        </div>
        {IsPending && <h4>loading...</h4>}
        {!IsPending &&
          postes.map((post) => {
            return (
              <div className='profilePosts' key={post._id}>
                <div className='profilePostImgPublisher'>
                  <div>
                    <img alt='' src={getimg(post.auther)} />
                  </div>
                  <div className='postsPublisherAndDate'>
                    <span>
                      {post.auther.firstname + " " + post.auther.surename}
                    </span>
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
                  <span onClick={()=>handelLikes(post._id)}>
                    <AiOutlineLike /> &nbsp; like
                  </span>
                  <span>
                    <FaRegCommentAlt /> &nbsp; comment
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
