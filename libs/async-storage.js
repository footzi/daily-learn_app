import { AsyncStorage } from "react-native";

export const setAsyncStorage = (key, value) => {
  try {
    return AsyncStorage.setItem(key, value)
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAsyncStorage = key => {
  try {
    return AsyncStorage.getItem(key)
  } catch (err) {
    console.error(err);
    throw err;
  }
};
