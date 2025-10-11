import { Row } from './styles';

interface GridRowProps {
  children: React.ReactNode;
  classname?: string;
}
const GridRow: React.FC<GridRowProps> = ({ children, classname }) => {
  return <Row className={`table-row ${classname}`}>{children}</Row>;
};
export default GridRow;
