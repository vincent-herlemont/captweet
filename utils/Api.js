import { Capacitor } from "@capacitor/core";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export function Url(path) {
  // let origin = Capacitor.isNative ? publicRuntimeConfig.api_origin : "";
  let origin = publicRuntimeConfig.api_origin;
  return origin + "/" + path;
}
