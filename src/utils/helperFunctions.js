export function formatTitle(str) {
  const splitedStr = str.split('_');
  const newArr = splitedStr.map((string) => string[0].toUpperCase() + string.slice(1));
  return newArr.join(' ');
}

export function extractKeyFromEachObjInArray(ArrOfObj, key) {
  return ArrOfObj.map((item) => Object.keys(item).reduce((acc, objKey) => {
    if (objKey === key) return acc;
    return {
      ...acc, [objKey]: item[objKey],
    };
  }, {}));
}
