import "./home.css";
import { useState, useEffect } from "react";
import Posts from "../posts/posts";
function Home({ logedUser }) {
  let [post, setPost] = useState("");
  let [posts, setPosts] = useState([]);
  let [map, setMap] = useState([]);

  useEffect(() => {
    fetch("timelinePosts", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setMap(result.map);
        setPosts(result.posts);
      });
  }, []);

  let handelSubmitPost = async () => {
    console.log(post);
    await fetch(`/addPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post }),
      credentials: "include",
    });
  };
  return (
    <div className="HomeBody">
      <form className="creatPost" onSubmit={handelSubmitPost}>
        <textarea
          placeholder="what's in your mind"
          onChange={(e) => setPost(e.target.value)}
        />
        <button id="postBtn">Post</button>
      </form>
      <Posts
        logedUser={logedUser}
        posts={posts}
        setPosts={setPosts}
        map={map}
      />
    </div>
  );
}

export default Home;
