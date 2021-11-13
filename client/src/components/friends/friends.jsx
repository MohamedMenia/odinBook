import "./friends.css";
function Friends() {
  return (
    <div className='body'>
      <h3>Friends</h3>
      <div className='allboxes'>
        <div className='friendBox'>
          <img
            alt=''
            src='https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8'
          />
          <span>iron man</span>
          <button>unfriend</button>
        </div>
        <div className='friendBox'>
          <img
            alt=''
            src='https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8'
          />
          <span>staven strange</span>
          <button>add friend</button>
        </div>
        <div className='friendBox'>
          <img
            alt=''
            src='https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture.jpg?itok=pRjSkTf8'
          />
          <span>omen diff</span>
          <button>add friend</button>
        </div>
      </div>
    </div>
  );
}

export default Friends;
