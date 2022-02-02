import "./posts.css";
import { useState } from "react";

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

function Posts() {
  let [post, setPost] = useState("");
  let handelSubmitPost = async () => {
    console.log(post)
    await fetch(`/addPost`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({post}),
      credentials: "include",
    });
  };
  return (
    <div>
      <form className='creatPost' onSubmit={handelSubmitPost} >
        <textarea
          placeholder="what's in your mind"
          onChange={(e) => setPost(e.target.value)}
        />
        <button id='postBtn'>Post</button>
      </form>
      <div className='postsBody'>
        <img
          alt=''
          src={
            "https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8"
          }
        />
        <div className='postsPublisherAndDate'>
          <span>Menia senapi</span>
          <span id='postDate'>1hr</span>
        </div>
        <div className='postContent'>
          <span>
            LOREM IPSUM GENERATOR Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </span>
          <span id='likes'>
            <AiFillLike /> 10
          </span>
          <hr />
        </div>
        <div className='likeComment'>
          <span>
            <AiOutlineLike /> &nbsp; like
          </span>
          <span>
            <FaRegCommentAlt /> &nbsp; comment
          </span>
        </div>
      </div>
    </div>
  );
}

export default Posts;
