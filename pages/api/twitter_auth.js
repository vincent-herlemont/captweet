import axios from "axios";
import qs from "qs";
import TwitterCfg from "../../utils/TwitterCfg";

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

let oauth_consumer_key = process.env.OAUTH_CONSUMER_KEY;
let oauth_consumer_secret = process.env.OAUTH_CONSUMER_SECRET;
let oauth_token_key = process.env.OAUTH_TOKEN_KEY;
let oauth_token_secret = process.env.OAUTH_TOKEN_SECRET;
let oauth_callback = process.env.OAUTH_CALLBACK;

export default async (req, res) => {
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
    url: TwitterCfg.request_token_url,
    method: "POST",
    data: { oauth_callback: oauth_callback },
  };

  const token = {
    key: oauth_token_key,
    secret: oauth_token_secret,
  };

  let content = oauth.authorize(request_data, token);

  let p = new Promise((resolve, reject) => {
    axios({
      baseURL: request_data.url,
      method: request_data.method,
      data: request_data.data,
      headers: oauth.toHeader(content),
    })
      .then((resp) => {
        console.log(resp.statusText);
        console.log(resp.data);
        resolve(resp.data);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });

  let response = await p;
  let objResponse = qs.parse(response);

  res.json(objResponse);
};
