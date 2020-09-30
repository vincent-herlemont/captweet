import { Capacitor, Plugins } from "@capacitor/core";
const { Browser } = Plugins;

export default (url, target = "_self") => {
  if (Capacitor.isNative) {
    Browser.open({ url });
  } else {
    window.open(url, target);
  }
};
