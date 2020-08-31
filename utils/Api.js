import { Capacitor } from "@capacitor/core";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

// Set foreign api_origin when we are in native app mode.
export function Url(path) {
  let origin = Capacitor.isNative ? publicRuntimeConfig.api_origin : "";
  return origin + "/" + path;
}
