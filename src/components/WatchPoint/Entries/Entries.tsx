import { format } from 'date-fns';
import {
  BoxEntries,
  Description,
  EntriesContainer,
  EntryRow,
  Time,
  Title,
} from './styles';

interface IEntriesProps {
  refresh: boolean;
}
const Entries: React.FC<IEntriesProps> = ({ refresh }) => {
  return (
    <EntriesContainer>
      <Title>Pontos de hoje: {format(new Date(), 'dd/MM/yyyy')}</Title>
      <BoxEntries>
        <EntryRow>
          <Description>Entrada - A</Description>
          <Time>08:00</Time>
        </EntryRow>
        <EntryRow>
          <Description>Saída - A</Description>
          <Time>12:00</Time>
        </EntryRow>
        <EntryRow>
          <Description>Entrada - B</Description>
          <Time>13:00</Time>
        </EntryRow>
        <EntryRow>
          <Description>Saída - B</Description>
          <Time>17:00</Time>
        </EntryRow>
      </BoxEntries>
    </EntriesContainer>
  );
};
export default Entries;
