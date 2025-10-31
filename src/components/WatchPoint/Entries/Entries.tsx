import { format } from 'date-fns';
import { IEmployeeMirrorResponse } from '@/interfaces/mirror/employeeMirrorResponse';
import {
  BoxEntries,
  Description,
  EntriesContainer,
  EntryRow,
  Time,
  Title,
} from './styles';

interface IEntriesProps {
  marks: IEmployeeMirrorResponse;
}
const Entries: React.FC<IEntriesProps> = ({ marks }) => {
  if (!marks?.listaEntradas) return;
  const entries = marks.listaEntradas.map(m => m.entradas).flat();

  const formatHour = (hour: string | undefined) => {
    if (!hour) return '-';
    // Split to remove milliseconds
    const [time] = hour.split('.');
    return time;
  };

  if (entries.length === 0) {
    return (
      <EntriesContainer>
        <Title>Pontos de hoje: {format(new Date(), 'dd/MM/yyyy')}</Title>
      </EntriesContainer>
    );
  }

  return (
    <EntriesContainer>
      <Title>Pontos de hoje: {format(new Date(), 'dd/MM/yyyy')}</Title>
      <BoxEntries>
        {entries.map((entry, index) => (
          <EntryRow key={index}>
            <Description>{entry.tipo}</Description>
            <Time>{formatHour(entry.hora)}</Time>
          </EntryRow>
        ))}
      </BoxEntries>
    </EntriesContainer>
  );
};
export default Entries;
