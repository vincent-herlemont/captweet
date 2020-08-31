import axios from "axios";
import qs from "qs";
import TwitterCfg from "../../utils/TwitterCfg";
import faunadb, { query } from "faunadb";

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

let oauth_consumer_key = process.env.OAUTH_CONSUMER_KEY;
let oauth_consumer_secret = process.env.OAUTH_CONSUMER_SECRET;
let faunadb_secret = process.env.FAUNADB_SECRET;

export default async (req, res) => {
  console.log("r1", req.query);

  let client = new faunadb.Client({ secret: faunadb_secret, timeout: 5000 });
  let q = faunadb.query;

  let obj_auth_token = await client.query(
    q.Get(q.Match(q.Index("tweet_oauth_token"), req.query.oauth_token))
  );

  console.log("r2", obj_auth_token);

  let oauth_token_key = obj_auth_token.data.oauth_token;
  let oauth_token_secret = obj_auth_token.data.oauth_token_secret;

  const oauth = OAuth({
    consumer: { key: oauth_consumer_key, secret: oauth_consumer_secret },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return crypto
        .createHmac("sha1", key)
        .update(base_string)
        .digest("base64");
    },
  });

  const request_data = {
    url: TwitterCfg.access_token_url,
    method: "POST",
    data: {
      oauth_verifier: req.query.oauth_verifier,
    },
  };

  const token = {
    key: oauth_token_key,
    secret: oauth_token_secret,
  };

  console.log("r3", token);

  let content = oauth.authorize(request_data, token);

  const p = new Promise((resolve, reject) => {
    axios({
      baseURL: request_data.url,
      method: request_data.method,
      data: request_data.data,
      headers: oauth.toHeader(content),
    })
      .then((resp) => {
        console.log("r4", resp.statusText);
        console.log("r4", resp.data);
        resolve({
          status: resp.statusText,
          data: resp.data,
        });
      })
      .catch((err) => {
        if (err) {
          console.log("r4.1", err.response.status);
          console.log("r4.1", err.response.data);
          resolve({
            status: err.response.status,
            data: err.response.data,
          });
        }
      });
  });

  res.json({ query: req.query, rep: await p });
};
