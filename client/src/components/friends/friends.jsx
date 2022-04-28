import "./friends.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {getimg} from "../../functions/getImg" 


function Friends() {
  let [isPending, setIsPending] = useState("true");
  let [friends, setFriends] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:8000/allFriends`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setFriends(result);
        setIsPending(false);
      });
  }, []);
  return (
    <div className='friendsbody'>
      <h3>Friends</h3>
      {isPending && <span>loading...</span>}
      {!isPending && (
        <div className='allboxes'>
          {friends.map((friend) => (
            <div className='friendBox' key={friend.email}>
              <img alt='' src={getimg(friend)} />
              <Link to={`/profile/${friend.email}`}>
                {friend.firstname} {friend.surename}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Friends;
