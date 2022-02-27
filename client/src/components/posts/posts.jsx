import './posts.css'
import React from "react";
import { getimg } from "../../functions/getImg";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

function Posts({ logedUser, posts, setPosts, map=logedUser.map }) {
  let handelLikes = async (postID, PostWriterID, likeStates) => {
    let postsCopy = posts.map((post) => {
      if (post._id === postID) {
        if (likeStates === "UnLike") {
          const index = post.likes.indexOf(logedUser._id);
          post.likes.splice(index, 1);
          post.likeStates = "Like";
        } else {
          post.likes.push(logedUser._id);
          post.likeStates = "UnLike";
        }
      }
      return post;
    });
    setPosts(postsCopy);
    await fetch(`/LikeAndUnlike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postID, PostWriterID, likeStates }),
      credentials: "include",
    });
  };
  let handelComments = async (e, postID, PostWriterID) => {
    e.preventDefault();
    let postsCopy = posts.map((post) => {
      if (post._id === postID) {
        post.comments.push({
          writerID: logedUser._id,
          content: e.target[0].value,
        });
      }
      return post;
    });
    setPosts(postsCopy);
    let comment = e.target[0].value;
    e.target[0].value = "";
    await fetch(`/addComment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postID, PostWriterID, comment }),
      credentials: "include",
    });
  };

  return (
    <React.Fragment>
      {posts.map((post) => (
        <div className="Posts" key={post._id}>
          <div className="PostImgPublisher">
            <div>
              <img alt="" src={getimg(map[post.PostWriterID])} />
            </div>
            <div className="postsPublisherAndDate">
              <span>
                {map[post.PostWriterID].firstname +
                  " " +
                  map[post.PostWriterID].surename}
              </span>
              <span className="postDate">{post.createdAt}</span>
            </div>
          </div>
          <div className="postContent">
            <span>{post.content}</span>
            <span className="likes">
              <AiFillLike /> {post.likes.length}
            </span>
            <hr />
          </div>
          <div className="likeComment">
            <span
              style={
                post.likeStates === "Like"
                  ? { color: "#444950" }
                  : { color: "#0577db" }
              }
              onClick={() =>
                handelLikes(post._id, post.PostWriterID, post.likeStates)
              }
            >
              <AiOutlineLike /> &nbsp; {post.likeStates}
            </span>
            <span>
              <FaRegCommentAlt /> &nbsp; comment
            </span>
          </div>
          <form
            className="comments"
            onSubmit={(e) => handelComments(e, post._id, post.PostWriterID)}
          >
            <input
              className="commentInput"
              placeholder="  write a comment..."
              autoComplete="off"
            />
            {post.comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <img alt="" src={getimg(map[comment.writerID])} />
                <div>
                  <p>
                    {map[comment.writerID].firstname +
                      " " +
                      map[comment.writerID].surename}
                  </p>
                  <span>{comment.content}</span>
                </div>
              </div>
            ))}
          </form>
        </div>
      ))}
    </React.Fragment>
  );
}
export default Posts;
