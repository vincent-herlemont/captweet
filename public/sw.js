if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return o[e]||(a=new Promise(async a=>{if("document"in self){const o=document.createElement("script");o.src=e,document.head.appendChild(o),o.onload=a}else importScripts(e),a()})),a.then(()=>{if(!o[e])throw new Error(`Module ${e} didn’t register its module`);return o[e]})},a=(a,o)=>{Promise.all(a.map(e)).then(e=>o(1===e.length?e[0]:e))},o={require:Promise.resolve(a)};self.define=(a,i,t)=>{o[a]||(o[a]=Promise.resolve().then(()=>{let o={};const s={uri:location.origin+a.slice(1)};return Promise.all(i.map(a=>{switch(a){case"exports":return o;case"module":return s;default:return e(a)}})).then(e=>{const a=t(...e);return o.default||(o.default=a),o})}))}}define("./sw.js",["./workbox-432e0d0b"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1de7dc321c24b751fa6dab0bf7d5776e419a7d51.07cceb933e441acab15e.js",revision:"ac6073d7b70ee98ddc44bd36f3f32c00"},{url:"/_next/static/chunks/29107295.60d6638950eb64d3ef78.js",revision:"273626881e7d536d3d31dcfb5476cd19"},{url:"/_next/static/chunks/2bb286fa254a82b8c3df11d4a03e366505be6f35.7c6c7ac4558798ddd00e.js",revision:"b996b93fe2ae285e248ff6a239efe0c5"},{url:"/_next/static/chunks/commons.08751dca23db7ea7ba5b.js",revision:"4caaf31f8d8b48c6fbebce5b49ab1de5"},{url:"/_next/static/chunks/ff2bacd5c3b9be1b981c9ec9a6761260aeaf2804.66570f2afff1d043bac1.js",revision:"5fadbe994e72014af9fde2c1be84e7c8"},{url:"/_next/static/chunks/framework.ea5d6f7a7099b14097ba.js",revision:"2fad19a1c024b5911479a0ff5588caa3"},{url:"/_next/static/chunks/main-9d25e10ae2bc8fe50bca.js",revision:"965afef666bb7ba4d4b88e3d252feb68"},{url:"/_next/static/chunks/pages/_app-981d940bf3cc990fbd1d.js",revision:"935bfb030bc889633ac32b0fdf81d2f3"},{url:"/_next/static/chunks/pages/_error-7348c7a706c0b2b2b7cc.js",revision:"270758879ee3c6208287cf5c8deace73"},{url:"/_next/static/chunks/pages/end-d597f1f0315e647a8807.js",revision:"492642325fe39ff20345e6a881321e09"},{url:"/_next/static/chunks/pages/game-02902ddec43b7af511a3.js",revision:"01f62a57d20e95562ed25d0f59c22730"},{url:"/_next/static/chunks/pages/index-b46703376e7da30954b2.js",revision:"48cc45011294c3691ad108239ef77d38"},{url:"/_next/static/chunks/pages/search-b257cb3533301b028362.js",revision:"0ec3205e4873ef25bbcd9c6152b12320"},{url:"/_next/static/chunks/polyfills-02c7b1969a870a29a536.js",revision:"69b8d62c86e51486ab104a6cba83ae4b"},{url:"/_next/static/chunks/webpack-a2db5744fee61346eaac.js",revision:"2019297a9ccffe0e261600bad1b1f98a"},{url:"/_next/static/css/dffcef05865167545765.css",revision:"b3d55bfad661b4aa3d27930a84d3e7a0"},{url:"/_next/static/jcjzbdD9HZzWJwpsS2HKG/_buildManifest.js",revision:"3d79503fcbd811106b63d28e0512c446"},{url:"/_next/static/jcjzbdD9HZzWJwpsS2HKG/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/android-chrome-192x192.png",revision:"91e8317aea1caa1aea44fc24bd1b99ba"},{url:"/android-chrome-512x512.png",revision:"405f2432185d8df4800b9e16e74dbfd5"},{url:"/apple-touch-icon.png",revision:"dea9ba9a3742b77a7062aba7d05a8c90"},{url:"/favicon-16x16.png",revision:"e35081ea9ab501ab3d7b41975be750f3"},{url:"/favicon-32x32.png",revision:"3cb1058519eb3b683015b3ab75623e88"},{url:"/favicon.ico",revision:"f4f6cc74a076fd3418ac9aca327eeb35"},{url:"/fonts/roboto/Roboto-Black.ttf",revision:"5ebb24ee1112dd9562629375c387879a"},{url:"/fonts/roboto/Roboto-BlackItalic.ttf",revision:"99682a78fa4fe61e1177b94757336bbf"},{url:"/fonts/roboto/Roboto-Bold.ttf",revision:"e07df86cef2e721115583d61d1fb68a6"},{url:"/fonts/roboto/Roboto-BoldItalic.ttf",revision:"5b44818d2b9eda3e23cd5edd7b49b7d5"},{url:"/fonts/roboto/Roboto-Italic.ttf",revision:"a720f17aa773e493a7ebf8b08459e66c"},{url:"/fonts/roboto/Roboto-Light.ttf",revision:"88823c2015ffd5fa89d567e17297a137"},{url:"/fonts/roboto/Roboto-LightItalic.ttf",revision:"a3ce4440f2abf76f4a1b14b83920138c"},{url:"/fonts/roboto/Roboto-Medium.ttf",revision:"58aef543c97bbaf6a9896e8484456d98"},{url:"/fonts/roboto/Roboto-MediumItalic.ttf",revision:"cf23e1bb619029496260760b72aebd30"},{url:"/fonts/roboto/Roboto-Regular.ttf",revision:"11eabca2251325cfc5589c9c6fb57b46"},{url:"/fonts/roboto/Roboto-Thin.ttf",revision:"321de678e592d0b8f44f1a82d7ca4b62"},{url:"/fonts/roboto/Roboto-ThinItalic.ttf",revision:"35a9c89aff1396595ad345e378a32aca"},{url:"/fonts/roboto_slab/LICENSE.txt",revision:"d273d63619c9aeaf15cdaf76422c4f87"},{url:"/fonts/roboto_slab/README.txt",revision:"33574d6e4ac5983c7d10ecfc5b43a5f4"},{url:"/fonts/roboto_slab/RobotoSlab-VariableFont_wght.ttf",revision:"0b2aeb1c9f580b22533476443b47f0ad"},{url:"/fonts/roboto_slab/static/RobotoSlab-Black.ttf",revision:"50e3b0409d8cf4a1e2baa08821235526"},{url:"/fonts/roboto_slab/static/RobotoSlab-Bold.ttf",revision:"b3954db228ca7701bf36469cf6c31c57"},{url:"/fonts/roboto_slab/static/RobotoSlab-ExtraBold.ttf",revision:"4ca0e90c275428ef7a5c0b824048f2ad"},{url:"/fonts/roboto_slab/static/RobotoSlab-ExtraLight.ttf",revision:"3fa296384846c42bb0a847a73620f3d0"},{url:"/fonts/roboto_slab/static/RobotoSlab-Light.ttf",revision:"07d63b4d0376fca3bbedc274d9dd9233"},{url:"/fonts/roboto_slab/static/RobotoSlab-Medium.ttf",revision:"8d557a38334591a1b4d6c12e3874346e"},{url:"/fonts/roboto_slab/static/RobotoSlab-Regular.ttf",revision:"2e935203e7200edebf345ee19a80f435"},{url:"/fonts/roboto_slab/static/RobotoSlab-SemiBold.ttf",revision:"c0c8f9633f1894907dcbbfd4fc9b5f6e"},{url:"/fonts/roboto_slab/static/RobotoSlab-Thin.ttf",revision:"843f16adb42efdf586c236384ea53d9b"},{url:"/icon/android-icon-192x192-dunplab-manifest-14124.png",revision:"c9df41e183c7b123d7a5da8a725ca83f"},{url:"/icon/apple-icon-114x114-dunplab-manifest-14124.png",revision:"061a33a74772de76e1aa34f94f03bd47"},{url:"/icon/apple-icon-120x120-dunplab-manifest-14124.png",revision:"ab91af45afc28525048172a2fdd1bb8c"},{url:"/icon/apple-icon-144x144-dunplab-manifest-14124.png",revision:"a0f4ca94d260acad30af6889bc4a9e70"},{url:"/icon/apple-icon-152x152-dunplab-manifest-14124.png",revision:"3e3866d3dd070c701f4494d723b2f844"},{url:"/icon/apple-icon-180x180-dunplab-manifest-14124.png",revision:"ddc4233dd1f811802eb07af593afa753"},{url:"/icon/apple-icon-57x57-dunplab-manifest-14124.png",revision:"d069e6eb0f906f88f9691c2a44b5e168"},{url:"/icon/apple-icon-60x60-dunplab-manifest-14124.png",revision:"130aef810bbcfacacb68dadfba8cc1d2"},{url:"/icon/apple-icon-72x72-dunplab-manifest-14124.png",revision:"336d1099ed9dd71bfbe097d31172394f"},{url:"/icon/apple-icon-76x76-dunplab-manifest-14124.png",revision:"8d08697c658acce00cad722f55360b15"},{url:"/icon/favicon-16x16-dunplab-manifest-14124.png",revision:"c83fc5fbf519f8f537137be794e7a5ba"},{url:"/icon/favicon-32x32-dunplab-manifest-14124.png",revision:"034dd17316c6e67d92dda6102ff0f073"},{url:"/icon/favicon-96x96-dunplab-manifest-14124.png",revision:"0a115d47bf05fb3e7ea20e2e11074c6a"},{url:"/img/catex_example_reasonably_small.jpg",revision:"4eb3be799dbd1fdbacdbe720fb8a2702"},{url:"/img/cloud.png",revision:"09dca14a3ae5a8cd85622df523f0bbe7"},{url:"/img/logo_twitter.png",revision:"268464725699b37a67c75acea70a5b0d"},{url:"/img/rolling.gif",revision:"a8bd2b810a475df4cbe89c2b008c6fe5"},{url:"/img/share/facebook.svg",revision:"17b73c41ad34079d51bd2dc099acf4c0"},{url:"/img/share/instagram.svg",revision:"15bc5470aea6d2d05200dff45c14e92b"},{url:"/img/share/share.svg",revision:"8b6117db18ab7a404bda261f08ab8dc1"},{url:"/img/share/snapchat.png",revision:"08ca7afbdb9290e3277332d4947f3d01"},{url:"/img/share/twitter.svg",revision:"dd90206d4d813b02e3f92ed7373ae817"},{url:"/img/target.svg",revision:"92cfe59e3f601d9071801a8c5fe402df"},{url:"/img/tweet_header_hide.png",revision:"36d11855bbf1568f080ca0221efd185e"},{url:"/img/verified_logo.svg",revision:"0c2a83b93fff97a778fb321d83388aa9"},{url:"/manifest.json",revision:"9d3c912caccc1887cba05d0455967caf"},{url:"/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
