export const mapToObject = <TValue>(map: Map<string, TValue>): Record<string, TValue> => {
  const obj: Record<string, TValue> = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
};
