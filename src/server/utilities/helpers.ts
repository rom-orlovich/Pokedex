export const convertWeight = (weightInPound: number): number =>
  Number((weightInPound * 0.1).toFixed(2));

export const convertHeight = (heightInMeters: number): number =>
  Number((heightInMeters * 0.1).toFixed(2));

export const promiseHandler = async <T>(promise: Promise<T>) => {
  try {
    const res = await promise;
    return [res, undefined] as const;
  } catch (error) {
    return [undefined, error as Error] as const;
  }
};
export const makeUniqeArr = (arr: any[]) => [...new Set(arr)];

export const dataOrErrorResponseAsConst = <T>(
  data: T,
  error: Error | undefined
) => {
  if (error) return [undefined, error] as const;
  return [data as T, undefined] as const;
};
export function createFieldValues(obj: any) {
  return Object.values(obj);
}
export function createFieldNames(obj: any) {
  return Object.keys(obj);
}
