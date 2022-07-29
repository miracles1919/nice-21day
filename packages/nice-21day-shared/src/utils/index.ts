export const parseObjJson = <T>(jsonString: string) => {
  let res = <T>{};
  try {
    res = JSON.parse(jsonString);
  } catch (error) {}
  return res;
};

export const parseArrayJson = <T>(jsonString: string) => {
  let res = <T[]>[];
  try {
    res = JSON.parse(jsonString);
  } catch (error) {}
  return res;
};
