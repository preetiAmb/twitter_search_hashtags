import React, { useState } from "react";
import "./styles.css";
import { useAPI } from "./contextAPI";

function SearchList() {
  const { loadTweetData } = useAPI();
   const [tags, setTags] = useState([]);

  const extract = require("mention-hashtag");

  var findHashtags = require("find-hashtags");

  const dataTweet = JSON.stringify(loadTweetData);
  const hashtags = extract(dataTweet, { symbol: false, type: "#" });

  // const filteredTweets = loadTweetData.filter((tweet) => {
  //   const hashtag = tweet.entities.hashtags;
  //     setTweets(hashtag);
  // });

  return (
    <div className="tag-container">
       {tags && hashtags.length > 0 ? hashtags.map((tag, index) => {
        return (
          <div key={index} className="tag">
            {tag}
          </div>
        );
      }) : <h1>Loading....</h1>}
      </div>
  );
}

export default SearchList;