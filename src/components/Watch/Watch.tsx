import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { SaveButton, TimeDisplay, WatchContainer } from './styles';

interface WatchProps {
  onSaveTime: (time: Date) => void;
}
const Watch: React.FC<WatchProps> = ({ onSaveTime }) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <WatchContainer>
      <TimeDisplay>{format(time, 'HH:mm:ss')}</TimeDisplay>
      <SaveButton type="button" onClick={() => onSaveTime(time)}>
        Registrar ponto
      </SaveButton>
    </WatchContainer>
  );
};
export default Watch;
