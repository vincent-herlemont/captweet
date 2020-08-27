// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default (req, res) => {
  res.statusCode = 200;

  axios
    .get("https://api.twitter.com/1.1/statuses/update.json")
    .then((response) => {
      console.log(response.data);
    });

  axios.res.json({ name: "John " });
};
