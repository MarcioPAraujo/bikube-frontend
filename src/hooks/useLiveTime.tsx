import { useEffect, useRef, useState } from 'react';

/**
 * Parses a non-standard date-time string into a Date object
 * Handles strings with excessive fractional second precision and time zone identifiers
 * @param dateTimeString - The non-standard date-time string to parse
 * @returns A Date object representing the parsed date and time
 */
function parseNonStandardDate(dateTimeString: string): Date {
  if (!dateTimeString) return new Date();
  // 1. Trim the non-standard time zone identifier ([America/Sao_Paulo])
  const trimmedString = dateTimeString.split('[')[0];

  // 2. Reduce the precision of the fractional seconds.
  // JS Date objects usually handle millisecond precision (3 digits).
  // The input has too many digits (455594240).
  const parts = trimmedString.split('.');

  if (parts.length > 1) {
    const fractionalSeconds = parts[1].substring(0, 3);
    const timeZoneOffset = parts[1].substring(
      parts[1].indexOf('-') || parts[1].indexOf('+'),
    );

    // Reassemble the string with millisecond precision
    const cleanString = `${parts[0]}.${fractionalSeconds}${timeZoneOffset}`;

    // 3. Create the Date object
    return new Date(cleanString);
  }

  // Fallback for unexpected format
  return new Date(trimmedString);
}

const useLiveTime = (serverTimeData: string) => {
  const parseDate = parseNonStandardDate(serverTimeData);

  const dateTime = parseDate ? new Date(parseDate) : new Date();
  const time = parseDate ? dateTime.getTime() : Date.now();

  const [liveTime, setLiveTime] = useState<Date>(dateTime);
  const serverSyncTimeRef = useRef<number>(time);

  // refreshes when parseDate is fetched
  useEffect(() => {
    if (!parseDate) return;

    serverSyncTimeRef.current = new Date(parseDate).getTime();
    setLiveTime(new Date(parseDate));
  }, [serverTimeData]);

  // updates every second based on the initial server time
  useEffect(() => {
    const startTime = Date.now();

    const intervalID = setInterval(() => {
      // the elapsed time is to know how much time has passed since the last sync with the server
      // it is important to avoid drift over time
      const elapsedTime = Date.now() - startTime;

      const updatedTime = new Date(serverSyncTimeRef.current + elapsedTime);
      setLiveTime(updatedTime);
    }, 1000);
    return () => clearInterval(intervalID);
  }, [serverSyncTimeRef.current]);

  return liveTime;
};
export default useLiveTime;
