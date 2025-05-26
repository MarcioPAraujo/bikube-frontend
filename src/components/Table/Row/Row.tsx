import { Row } from './styles';

interface GridRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}
const GridRow: React.FC<GridRowProps> = ({ children, ...props }) => {
  return (
    <Row className="table-row" {...props}>
      {children}
    </Row>
  );
};
export default GridRow;
