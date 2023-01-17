import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { TwitterApi } from "twitter-api-v2";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 9000;

const userClient = new TwitterApi({
  appKey: "V1HE1hmHHNwYTuF9JcnRUPPYZ",
  appSecret: "Wi8HvMSrvDA1KNscq1oQLmlvJTweEJW0OWoFu4fKRCpXpvvUFn",
  accessToken: "835833912035328000-BxuZamlwagGQYT6reRPklTpLk6YWCAz",
  accessSecret: "d7YjK03tb113Xmj3Anozke1oIXg07zLYAQXGk2iyLIDyz",
});


const appOnlyClientFromConsumer = await userClient.appLogin();

const foundUsers = await userClient.v1.searchUsers("Preeti");
// Home timeline is available in v1 API, so use .v1 prefix
const homeTimeline = await userClient.v1.homeTimeline();

// Current page is in homeTimeline.tweets
//console.log(homeTimeline);

// const nextHomePage = await homeTimeline.next();
// console.log('Fetched tweet IDs in next page:', nextHomePage.tweets.map(tweet => tweet));

app.get("/feeds", async (request, response) => {
  const id = '835833912035328000'
  try {
    const result = await userClient.v2.get(`users/${id}/tweets` , {
      expansions: ['attachments.media_keys', 'attachments.poll_ids', 'referenced_tweets.id'],
      'tweet.fields':['attachments','author_id','created_at','entities','geo','id','in_reply_to_user_id','lang','possibly_sensitive','referenced_tweets','source','text','withheld'],
      'media.fields': ['url'],
    });
    const feedsResult = result.data
    //console.log(feedsResult)
    response.json({ feedsResult });
  } catch (e) {
    // Request failed!
    const errors = TwitterApi.getErrors(e); // ErrorV1[]
    console.log("Received errors from v2 API", errors);
  }
});

app.get("/hashtags", async (request, response) => {
  try {
    const result = await userClient.v2.get("tweets/search/recent", {
      query: "ExtremeWeather -is:retweet",
      max_results: 100,
      "tweet.fields": ["entities","author_id","text","lang"],
      expansions: [
        "entities.mentions.username",
        "author_id",
        "referenced_tweets.id",
        "referenced_tweets.id.author_id",
      ],
      'user.fields': 'id,name,username,location'
    });

    const tweetData = result.data;
    const filteredTags = tweetData.filter((data: any) => {
      const tweetHashtags = data.entities;
      return tweetHashtags;
    });
    response.json({ filteredTags });
  } catch (e) {
    // Request failed!
    const errors = TwitterApi.getErrors(e); // ErrorV1[]
    console.log("Received errors from v2 API", errors);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});