export const ONLY_NUMBERS = /^[0-9]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const HOUR_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const MOBILE_REGEX = /^\(?\d{2}\)?\s?(9\d{4})-?(\d{4})$/;
export const LANDLINE_REGEX = /^\(?\d{2}\)?\s?(\d{4})-?(\d{4})$/;
export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
export const ZIP_CODE_REGEX = /^\d{5}-\d{3}$/;
export const DDMMYYYY_REGEX =
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
