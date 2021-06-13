import store from "store";

// retrieves a localstorage object using a storage key
// key is the key of the object
export default function useStore(storage_key: string, key: string) {
  const readOptions = (): Record<string, string> =>  {
    return store.get(storage_key) || {};
  }

  const setLastValue = (value: any): void => {
    if (value === null) {
      store.remove(storage_key)
      return
    }
    const options = readOptions();
    options[key] = value;
    store.set(storage_key, options);
  }


  const getLastValue = (): string => {
    const options = readOptions();
    return options[key] || '';
  }

  return {getLastValue, setLastValue};
}
