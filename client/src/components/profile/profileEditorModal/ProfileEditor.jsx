import "./profileEditor.css";
import { useState } from "react";

function ProfileEditor({ user }) {
  const [img, setImg] = useState([]);
  user = user.user;
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", img);
    console.log(formData.get("avatar"));

    fetch(`/profile`, {
      method: "post",
      credentials: "include",
      body: formData,
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      encType='multipart/form-data'
      className='profileEditor'>
      <img
        width='100'
        alt=''
        src={`data:${user.mimeType};base64,${user.b64}`}
      />
      <input
        type='file'
        accept='.png, .jpg, .jpeg'
        onChange={(e) => {
          setImg(e.target.files[0]);
        }}
      />
      <span>bio</span>
      <textarea>{user.bio}</textarea>
      <span>firstname</span>
      <input value={user.firstname} />
      <span>surename</span>
      <input value={user.surename} />
      <span>email</span>
      <input value={user.email} />
      <span>twitterURL</span>
      <input value={user.twitterURL} />
      <span>instgramURL</span>
      <input value={user.instgramURL} />
      <span>facebookURL</span>
      <input value={user.facebookURL} />
      <button type='submit'>submit</button>
    </form>
  );
}

export default ProfileEditor;
