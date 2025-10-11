import { format, isLeapYear } from 'date-fns';

const monthsWith30Days = ['04', '06', '09', '11'];
const monthsWith31Days = ['01', '03', '05', '07', '08', '10', '12'];
const february = '02';
const currentYear = format(new Date(), 'yyyy');

type Limit = 'present' | 'any';

const ddmmyyyyMask = (value: string, limit: Limit = 'present') => {
  // Remove all non-digit characters
  const cleanedValue = value.replace(/\D/g, '');

  // Limit the length to 8 digits
  const limitedValue = cleanedValue.slice(0, 8);

  // Format the value as DD/MM/YYYY
  const formattedValue = limitedValue.replace(
    /(\d{2})(\d{2})(\d{0,4})/,
    (match, p1, p2, p3) => {
      if (p1 > 31) {
        return '31/';
      }
      if (!p2) {
        return `${p1}/`;
      }
      if (p2 > 12) {
        return `${p1}/12/`;
      }
      if (p2 === february && p3.length === 4) {
        const isLeap = isLeapYear(new Date(Number(p3), 0, 1));
        const maxDay = isLeap ? 29 : 28;
        if (p1 > maxDay) {
          return `${maxDay}/02/${p3}`;
        }
      }
      if (monthsWith30Days.includes(p2) && p1 > 30) {
        return `30/${p2}/${p3}`;
      }
      if (monthsWith31Days.includes(p2) && p1 > 31) {
        return `31/${p2}/${p3}`;
      }
      if (p3 > currentYear && limit === 'present') {
        return `${p1}/${p2}/${currentYear}`;
      }
      return p3 ? `${p1}/${p2}/${p3}` : `${p1}/${p2}`;
    },
  );

  return formattedValue;
};
export default ddmmyyyyMask;
