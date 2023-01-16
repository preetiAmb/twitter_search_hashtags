import React, { useState } from "react";
import SearchList from "./SearchList";
import { useAPI } from "./contextAPI";
import "./styles.css";

function Search() {
  const [searchField, setSearchField] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const { loadTweetData } = useAPI();
  const [tags, setTags] = useState([]);

  const dataTweet = JSON.stringify(loadTweetData);
  const extract = require("mention-hashtag");
  const hashtags = extract(dataTweet, { symbol: false, type: "#" });

  const filteredtags = hashtags.filter((tag) => {
    return tag.toLowerCase().includes(searchField.toLowerCase());
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = hashtags.filter((item) => {
            return (item).toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(hashtags)
    }
}


  function searchList() {
    return <SearchList filteredtags={filteredtags} />;
  }

  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Search twitter tags</h2>
      </div>
      <form form action="/" method="post">
        <input
          type="search"
          className="search"
          placeholder="Search hashtags"
          onChange={(e) => searchItems(e.target.value)}
        />       
      </form>
      <div className="tag-container">
      {tags && searchInput.length > 0 ? (
        filteredResults.map((tag, index) => {
          return (
            <div key={index} className="tag">
              {tag}
            </div>
          );
        })
      ) : (
        <div>{searchList()}</div>
      )}
      </div>
    
    </section>
  );
}

export default Search;
