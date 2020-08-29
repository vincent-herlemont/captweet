#!/bin/bash
if [[ "$1" == "build_android" ]]; then
  npm run build_android && npx cap sync
elif [[ "$1" == "deploy" ]]; then
  npm run build && vercel --prod
elif ! [ -z "$1" ]; then
  npm run $1
else
  npm run dev
fi