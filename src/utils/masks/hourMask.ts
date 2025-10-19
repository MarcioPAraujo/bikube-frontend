const hourMask = (value: string): string => {
  // Remove all non-digit characters
  const cleanedValue = value.replace(/\D/g, '');

  // Limit the length to 6 digits
  const limitedValue = cleanedValue.slice(0, 6);

  // the first two digits must be between 00 and 23
  const hours = limitedValue.slice(0, 2);
  const hoursAsNumber = Number(hours);
  if (hoursAsNumber > 23) {
    return '23';
  }

  // the last two digits must be between 00 and 59
  const minutes = limitedValue.slice(2, 4);
  const minutesAsNumber = Number(minutes);
  if (minutesAsNumber > 59) {
    return `${hours}:59`;
  }

  const seconds = limitedValue.slice(4, 6);
  const secondsAsNumber = Number(seconds);
  if (secondsAsNumber > 59) {
    return `${hours}:${minutes}:59`;
  }

  if (limitedValue.length > 4) {
    return `${hours}:${minutes}:${seconds}`;
  }

  // Format the value as HH:MM:SS
  const formattedValue = limitedValue.replace(
    /(\d{2})(\d{0,2})(\d{0,2})/,
    (match, p1, p2, p3) => {
      let result = p1;
      if (p2) {
        result += `:${p2}`;
      }
      if (p3) {
        result += `:${p3}`;
      }
      return result;
    },
  );

  return formattedValue;
};
export default hourMask;
