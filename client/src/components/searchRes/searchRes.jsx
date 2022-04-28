import "./searchRes.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {getimg} from "../../functions/getImg";


function SearchRes() {
  const [result, setResult] = useState([]);

  let searchStr = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/search/${searchStr["str"]}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setResult(result);
      });
  }, [searchStr]);

  return (
    <div className='searchBody'>
      <h3>search</h3>
      <div className='searchBoxes'>
        {result.map((data) => {
          let src = getimg(data);
          return (
            <div key={data.email} className='searchBox'>
              <img alt='' src={src} />
              <Link to={`/profile/${data.email}`}>
                {data.firstname} {data.surename}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchRes;
