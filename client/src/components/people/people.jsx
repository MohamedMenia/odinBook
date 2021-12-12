import "./people.css";
import { useState, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function People() {
  const [isPending, setIsPending] = useState(true);
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
  const [friendStatus, setFriendStatus] = useState({ friendStatus: null });
  let peopleEmail = useParams();
  useEffect(() => {
    fetch(`/people/${peopleEmail["email"]}`, {
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
        setIsPending(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  let handelFriend = async () => {
    setFriendStatus({ friendStatus: "loading" });
    let res = await fetch("/addFriendREQ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        people: user._id,
        friendStatus: friendStatus.friendStatus,
      }),
      credentials: "include",
    });
    let result = res.status;
    console.log(result);
  };
  function getimg(user) {
    if (user !== null) {
      if (user.img) {
        const buffer = user.img.data.data;
        let b64 = Buffer.from(buffer).toString("base64");
        let mimeType = user.img.contentType;
        return `data:${mimeType};base64,${b64}`;
      } else
        return "https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8";
    }
  }

  //  const history = useHistory();

  return (
    <div className='peopleBody'>
      {isPending && <p>loading...</p>}
      {!isPending && (
        <div className='grid'>
          <img id='peoplePicture' alt='' src={getimg(user)} />
          <div className='username+bio'>
            <p id='username'>
              {user.firstname} {user.surename}
            </p>
            <p>{user.bio}</p>
          </div>
          <div className='frindBtn' onClick={handelFriend}>
            <button>{friendStatus.friendStatus}</button>
          </div>
          <div className='peopleLinks'>
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
          <div className='peoplePostes'>
            <p>postes</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default People;
