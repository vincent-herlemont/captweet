import axios from "axios";
import TwitterCfg from "../../utils/TwitterCfg";

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

let oauth_consumer_key = process.env.OAUTH_CONSUMER_KEY;
let oauth_consumer_secret = process.env.OAUTH_CONSUMER_SECRET;

export default async (req, res) => {
  const { oauth_token, oauth_token_secret } = req.headers;

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
    url:
      "https://api.twitter.com/1.1/friends/list.json?count=200&include_user_entities=true",
    method: "GET",
  };

  const token = {
    key: oauth_token,
    secret: oauth_token_secret,
  };

  let content = oauth.authorize(request_data, token);

  const pRequest = new Promise((resolve, reject) => {
    axios({
      baseURL: request_data.url,
      method: request_data.method,
      headers: oauth.toHeader(content),
    })
      .then((resp) => {
        console.info(resp.statusText);
        resolve({
          status: resp.statusText,
          data: resp.data,
        });
      })
      .catch((err) => {
        if (err) {
          console.info(err.response.status);
          console.info(err.response.data);
          resolve({
            status: err.response.status,
            data: err.response.data,
          });
        }
      });
  });

  let response = await pRequest;

  res.json({ response: response ? response : "" });
};
