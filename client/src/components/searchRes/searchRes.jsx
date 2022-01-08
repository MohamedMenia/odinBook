import "./searchRes.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SearchRes({ setPeople, user }) {
  const [result, setResult] = useState([]);

  let searchStr = useParams();
  useEffect(() =>{
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
  }, [searchStr]);
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

  return (
    <div className='searchBody'>
      <h3>search</h3>
      <div className='searchBoxes'>
        {result.map((data) => {
          let src = getImg(data);
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
