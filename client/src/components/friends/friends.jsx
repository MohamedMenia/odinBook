import "./friends.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Friends() {
  let [isPending,setIsPending]=useState('true')
  let [friends,setFriends]=useState([])
  function getImg(data) {
    if (data.img) {
      const buffer = data.img.data.data;
      let b64 = Buffer.from(buffer).toString("base64");
      let mimeType = data.img.contentType;
      let src = `data:${mimeType};base64,${b64}`;
      return src;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Friends]);
  return (
    <div className='body'>
      <h3>Friends</h3>
      {isPending &&<span>loading...</span>}
      {!isPending &&
      <div className='allboxes'>
        {friends.map(friend=>{
          let src=getImg(friend)
          return(
        <div className='friendBox' key={friend.email}>
          <img
            alt=''
            src={src}
          />
            <Link
                to={`/people/${friend.email}`}
               >
                {friend.firstname} {friend.surename}
              </Link>
        </div>)
        })}
      </div>
}
    </div>
  );
}

export default Friends;
