import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
  static async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async get(key) {
    try {
      return JSON.parse(await AsyncStorage.getItem(key));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async has(key) {
    try {
      return !!(await AsyncStorage.getItem(key));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async remove(key) {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
