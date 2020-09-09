import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const TTL_STORAGE_KEY_SUFFIX = "ttl";

function ttlStorageKeyName(storageKey) {
  return storageKey + "_" + TTL_STORAGE_KEY_SUFFIX;
}

export const useStorage = function () {
  return {
    saveToStorage: async (key, json) => {
      json = JSON.stringify(json);
      if (!json) {
        console.error("Fail to save ", key);
        return;
      }
      await Storage.set({
        key: ttlStorageKeyName(key),
        value: Math.round(Date.now() / 1000),
      });

      await Storage.set({ key, value: json });
    },
    getFromStorage: async (key, ttl = 600) => {
      let create_date = await Storage.get({ key: ttlStorageKeyName(key) });
      create_date = parseInt(create_date.value);
      let diff = Math.round(Date.now() / 1000) - create_date;
      if (diff > ttl) {
        return false;
      }

      try {
        let data = await Storage.get({ key });
        return JSON.parse(data.value);
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    removeFromStorage: async (key) => {
      await Storage.remove({ key: ttlStorageKeyName(key) });
      await Storage.remove({ key });
    },
  };
};
