import "./home.css";
import { useState, useEffect } from "react";
import Posts from "../posts/posts";
function Home({ logedUser,setUser }) {
  let [post, setPost] = useState("");
  let [posts, setPosts] = useState([]);
  let [map, setMap] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/timelinePosts", {
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

  let handelSubmitPost = async (e) => {
    e.preventDefault();
    await  fetch(`http://localhost:8000/addPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post }),
      credentials: "include",
    });
   // console.log(logedUser.posts)
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
