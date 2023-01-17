import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { TwitterApi } from "twitter-api-v2";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 9000;

// OAuth 1.0a (User context)
const userClient = new TwitterApi({
  appKey: "V1HE1hmHHNwYTuF9JcnRUPPYZ",
  appSecret: "Wi8HvMSrvDA1KNscq1oQLmlvJTweEJW0OWoFu4fKRCpXpvvUFn",
  accessToken: "835833912035328000-BxuZamlwagGQYT6reRPklTpLk6YWCAz",
  accessSecret: "d7YjK03tb113Xmj3Anozke1oIXg07zLYAQXGk2iyLIDyz",
});


const appOnlyClientFromConsumer = await userClient.appLogin();

const foundUsers = await userClient.v1.searchUsers("Preeti");

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
      const tweetHashtags = data.entities.hashtags;
      return tweetHashtags;
    });

    response.send({ filteredTags });
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