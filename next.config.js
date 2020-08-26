const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  rewrites() {
    return [{ source: "/_next/:path*", destination: "/toto/:path*" }];
  },
});
