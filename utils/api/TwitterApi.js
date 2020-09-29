import axios from "axios";

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

const OAUTH_CONSUMER_KEY = process.env.OAUTH_CONSUMER_KEY;
const OAUTH_CONSUMER_SECRET = process.env.OAUTH_CONSUMER_SECRET;

export default class TwitterApi {
  request_data = {
    url: undefined,
    method: "GET",
  };

  token = {
    key: undefined,
    secret: undefined,
  };

  constructor(request_data, token) {
    this.client = OAuth({
      consumer: { key: OAUTH_CONSUMER_KEY, secret: OAUTH_CONSUMER_SECRET },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });

    this.request_data = Object.assign(request_data);
    this.token = Object.assign(token);
  }

  request() {
    let content = this.client.authorize(this.request_data, this.token);

    return new Promise((resolve, reject) => {
      axios({
        baseURL: this.request_data.url,
        method: this.request_data.method,
        headers: this.client.toHeader(content),
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
  }
}
