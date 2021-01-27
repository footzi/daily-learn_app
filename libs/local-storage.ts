import { AsyncStorage } from 'react-native';
// https://facebook.github.io/react-native/docs/asyncstorage

export class LocalStorage {
  static async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async get<T>(key: string): Promise<T> {
    try {
      return JSON.parse(await AsyncStorage.getItem(key));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async has(key: string): Promise<boolean> {
    try {
      return !!(await AsyncStorage.getItem(key));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
