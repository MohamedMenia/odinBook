import "./profileEditor.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileEditor({ user, setUser }) {
  const [img, setImg] = useState([]);
  const [bio, setBio] = useState(user.bio);
  const [firstname, setFirstname] = useState(user.firstname);
  const [surename, setSurename] = useState(user.surename);
  const [email, setEmail] = useState(user.email);
  const [facebookURL, setFacebookURL] = useState(user.facebookURL || "");
  const [twitterURL, setTwitterURL] = useState(user.twitterURL || "");
  const [instgramURL, setinstgramURL] = useState(user.instgramURL || "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (img.length !== 0) {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      let userid = user._id;
      reader.onloadend = () => {
        let useroject = { ...user, img: reader.result };
        useroject.map[`${userid}`].img = reader.result;
        setUser(useroject);
      };
    }
    setUser({
      ...user,
      bio: bio,
      firstname: firstname,
      surename: surename,
      email: email,
      facebookURL: facebookURL,
      twitterURL: twitterURL,
      instgramURL: instgramURL,
    });
    formData.append("avatar", img);
    if (bio) formData.append("bio", bio);
    formData.append("firstname", firstname);
    formData.append("surename", surename);
    formData.append("email", email);
    if (facebookURL) formData.append("facebookURL", facebookURL);
    if (twitterURL) formData.append("twitterURL", twitterURL);
    if (instgramURL) formData.append("instgramURL", instgramURL);
    navigate(`profile/${user.email}`);
    await fetch(`http://localhost:8000/profile`, {
      method: "post",
      credentials: "include",
      body: formData,
    });
  };
  return (
    <div className="EditProfilbody">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="profileEditor"
      >
        <input
          id="imginput"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <span>firstname</span>
        <input
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          required
        />
        <span>surename</span>
        <input
          value={surename}
          onChange={(e) => {
            setSurename(e.target.value);
          }}
          required
        />
        <span>email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <span>facebookURL</span>
        <input
          value={facebookURL}
          onChange={(e) => {
            setFacebookURL(e.target.value);
          }}
        />
        <span>twitterURL</span>
        <input
          value={twitterURL}
          onChange={(e) => {
            setTwitterURL(e.target.value);
          }}
        />
        <span>instgramURL</span>
        <input
          value={instgramURL}
          onChange={(e) => {
            setinstgramURL(e.target.value);
          }}
        />
        <span>bio</span>
        <textarea
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        >
          {bio}
        </textarea>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default ProfileEditor;
