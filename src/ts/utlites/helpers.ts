export const capatialFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1);
export const makeUniqeArr = (arr: any[]) => [...new Set(arr)];

export const createEnteries = (obj: object) => Object.entries(obj);
