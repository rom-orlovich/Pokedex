export const convertWeight = (weightInPound: number): number =>
  Number((weightInPound * 0.1).toFixed(2));

export const convertHeight = (heightInMeters: number): number =>
  Number((heightInMeters * 0.1).toFixed(2));
