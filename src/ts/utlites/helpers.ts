export const capatialFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export const makeUniqeArr = (arr: any[]) => [...new Set(arr)];

export const createEnteries = (obj: object) => Object.entries(obj);

export const fetchData = async (
  url: string,
  method?: string,
  body?: object
) => {
  const options = body
    ? {
        method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    : {};

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
