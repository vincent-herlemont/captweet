const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  rewrites() {
    return [{ source: "/_next/:path*", destination: "/toto/:path*" }];
  },
  publicRuntimeConfig: {
    api_origin: process.env.URL_API_ORIGIN,
  },
  async headers() {
    return [
      {
        // mathching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, oauth_token, oauth_token_secret, user_id",
          },
        ],
      },
    ];
  },
});
