import React, { useContext, useEffect, useState } from "react";

const HTTP_GET = "GET";
// #region API context
const ApiContext = React.createContext();
const useApiContext = () => useContext(ApiContext);

const ApiContextProvider = ({ children }) => {
  const [loadTweetData, setLoadTweetData] = useState([]);
  const [loadTweetFeeds, setLoadTweetFeeds] = useState([]);

  const callApiTags = (method, body = null) => {
    return fetch("http://localhost:9000/hashtags", {
      method,
      headers: {
        "Content-Type": "text/plain",
      },
      body: body ? JSON.stringify(body) : null,
    });
  };


  const callApiTimeLine = (method, body = null) => {
    return fetch("http://localhost:9000/feeds", {
      method,
      headers: {
        "Content-Type": "text/plain",
      },
      body: body ? JSON.stringify(body) : null,
    });
  };

  const TweetData = () => {
    try {
      callApiTags(HTTP_GET)
        .then((response) => response.json())
        .then((data) => {
          setLoadTweetData(data.filteredTags);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const TweetTimeLineData = () => {
    try {
      callApiTimeLine(HTTP_GET)
        .then((response) => response.json())
        .then((data) => {
          setLoadTweetFeeds(data.feedsResult);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const filteredTags = loadTweetData.filter((data) => {
    const tweetHashtags = data.entities.hashtags;
    return tweetHashtags;
  });

  useEffect(() => {
    TweetData();
    TweetTimeLineData();
  }, []);

  return (
    <ApiContext.Provider value={{ loadTweetData, loadTweetFeeds }}>
      {children}
    </ApiContext.Provider>
  );
};

export function useAPI() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

export default ApiContextProvider;
