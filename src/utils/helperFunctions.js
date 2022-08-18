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

function getComparison(value1, value2, operator) {
  const valueNum1 = parseInt(value1, 10);
  const valueNum2 = parseInt(value2, 10);
  switch (operator) {
  case 'maior que':
    return valueNum1 > valueNum2;
  case 'menor que':
    return valueNum1 < valueNum2;
  case 'igual a':
    return valueNum1 === valueNum2;
  default:
    return true;
  }
}

export function filterResults(obj, filterArr) {
  if (!filterArr.length) return true;
  return filterArr.every((filterObj) => {
    const { column, comparison, value } = filterObj;
    return getComparison(obj[column], value, comparison);
  });
}
