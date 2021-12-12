import { BrowserRouter as Router, Route } from "react-router-dom";
import "./home.css";
import Navbar from "../navbar/navbar";
import Friends from "../friends/friends";
import SearchRes from "../searchRes/searchRes";
import Profile from "../profile/profile.jsx";
import ProfileEditor from "../profile/profileEditorModal/ProfileEditor";
import People from "../people/people";
import Posts from "../posts/posts";


function Home({ user,reloaduser,setReloaduser }) {
  return (
    <Router>
      <div className='flex'>
        <div className='head'>
          <Navbar user={user} />
        </div>
        <Route exact path='/'>
          <Posts/>
        </Route>
        <Route exact path='/profile'>
          <Profile user={user}/>
        </Route>
        <Route exact path='/profile/edit'>
          <ProfileEditor user={user} reloaduser={reloaduser}setReloaduser={setReloaduser} />
        </Route>
        <Route exact path='/friends'>
          <Friends />
        </Route>
        <Route  path='/search/:str'>
          <SearchRes user={user}/>
        </Route>
        <Route exact path='/people/:email'>
          <People/>
        </Route>
      </div>
    </Router>
  );
}

export default Home;
