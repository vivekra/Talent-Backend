const pick = (object: any, keys: any) => {
  return keys.reduce((obj: any, key: any) => {
    if (object?.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
