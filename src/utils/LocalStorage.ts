import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: any, key: string) => {
  try {
    let storedArray = await getData(key);
    if (!storedArray) storedArray = [];
    storedArray.push(value);
    await AsyncStorage.setItem(key, JSON.stringify(storedArray));
  } catch (e) {
    // saving error
  }
};
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
