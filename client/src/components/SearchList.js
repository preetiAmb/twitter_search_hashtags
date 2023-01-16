import React, { useState } from "react";
import "./styles.css";
//import Card from './Card';
import { useAPI } from "./contextAPI";

function SearchList() {
  const { loadTweetData } = useAPI();
  const [isLoading, setIsLoading] = useState(false);
  const [tweets, setTweets] = useState([]);
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
      }) : <h1>No Result Found</h1>}

{/* {loadTweetData.filter((tweet) => {
    const hashtag = tweet.entities.hashtags;
      setTweets(hashtag)
      return (
       {tweets}
      )
  })}; */}
      </div>
  );
}

export default SearchList;