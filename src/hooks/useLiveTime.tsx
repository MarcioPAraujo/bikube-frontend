import { useEffect, useRef, useState } from 'react';

const useLiveTime = (serverTimeData: string) => {
  const dateTime = serverTimeData ? new Date(serverTimeData) : new Date();
  const time = serverTimeData ? dateTime.getTime() : Date.now();

  const [liveTime, setLiveTime] = useState<Date>(dateTime);
  const serverSyncTimeRef = useRef<number>(time);

  // refreshes when serverTimeData is fetched
  useEffect(() => {
    if (!serverTimeData) return;

    serverSyncTimeRef.current = new Date(serverTimeData).getTime();
    setLiveTime(new Date(serverTimeData));
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
