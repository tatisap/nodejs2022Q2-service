export const convertObjectToString = (
  startString: string,
  object: any,
): string => {
  if (
    (typeof object !== 'object' && object === null) ||
    Object.keys(object).length === 0
  ) {
    return '';
  }
  const objectEntries = Object.entries(object);
  return objectEntries.reduce((accStr, [property, value]): string => {
    const convertedValue =
      typeof value === 'object' && value !== null
        ? convertObjectToString('\n', value)
        : value;
    return accStr + `  ${property} - ${convertedValue}\n`;
  }, startString);
};
