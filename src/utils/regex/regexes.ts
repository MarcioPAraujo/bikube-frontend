const email = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const onlyNumbers = /^[0-9]+$/;

export const regexes = {
  email,
  onlyNumbers,
} as const;
