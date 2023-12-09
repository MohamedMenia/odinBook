import "./posts.css";
import React from "react";
import Post from "./post/post"

function Posts({ logedUser, posts, setPosts, map = logedUser.map }) {
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
    await fetch(`http://localhost:8000/LikeAndUnlike`, {
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
    await fetch(`http://localhost:8000/addComment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postID, PostWriterID, comment }),
      credentials: "include",
    });
  };

  return (
    <React.Fragment>
      {posts.map((post) => (
        <Post key={post._id} post={post} map={map}handelComments={handelComments}handelLikes={handelLikes} />
      ))}
    </React.Fragment>
  );
}
export default Posts;
