import "./friends.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Friends() {
  let [isPending, setIsPending] = useState("true");
  let [friends, setFriends] = useState([]);
  function getimg(user) {
    if (user.img) {
      const buffer = user.img.data.data;
      let b64 = Buffer.from(buffer).toString("base64");
      let mimeType = user.img.contentType;
      return `data:${mimeType};base64,${b64}`;
    } else
      return "https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8";
  }

  useEffect(() => {
    fetch(`/allFriends`, {
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
