import "./searchRes.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SearchRes() {
  const [result, setResult] = useState([]);
  let searchStr = useParams();
  useEffect(() => {
    fetch(`/search/${searchStr["str"]}`, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='searchBody'>
      <h3>search</h3>
      <div className='searchBoxes'>
        {result.map((data) => {
          return (
            <div key={data.email} className='searchBox'>
              <img
                alt='ff'
                src='https://www.looper.com/img/gallery/youve-been-playing-omen-in-valorant-all-wrong/intro-1589997858.jpg'
              />
              <Link to='./profile'>
                {data.firstname} {data.surename}
              </Link>
              <button>unfriend</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchRes;
