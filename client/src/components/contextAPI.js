import React, { useContext, useEffect, useState } from "react";

const HTTP_GET = "GET";
// #region API context
const ApiContext = React.createContext();
const useApiContext = () => useContext(ApiContext);

const ApiContextProvider = ({ children }) => {
  const [loadTweetData, setLoadTweetData] = useState([]);

  const callApi = (method, body = null) => {
    return fetch("http://localhost:9000/hashtags", {
      method,
      headers: {
        "Content-Type": "text/plain",
      },
      body: body ? JSON.stringify(body) : null,
    });
  };

  const TweetData = () => {
    try {
      callApi(HTTP_GET)
        .then((response) => response.json())
        .then(
          (data) => {
            setLoadTweetData(data.filteredTags);
          });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    TweetData()
  },[]);

  return (
    <ApiContext.Provider value={{ loadTweetData }}>
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