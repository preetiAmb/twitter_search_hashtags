import React, { useState } from "react";
import { useAPI } from "./contextAPI";

const FeedsList = () => {
  const { loadTweetFeeds } = useAPI();

  return (
    <div className="feeds">
      <div>RSS Feeds</div>

      {loadTweetFeeds &&
        loadTweetFeeds.map((feed) => {
          return (
            <ul>
              <li>{feed.id}</li>
              <li>{feed.author_id}</li>
              <li>{feed.created_at}</li>
              <li>{feed.text}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default FeedsList;
