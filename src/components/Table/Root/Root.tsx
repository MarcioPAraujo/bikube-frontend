import { Table } from './styles';

type TableClass =
  | 'setores'
  | 'logs'
  | 'employees'
  | 'announcements'
  | 'default'
  | 'vacations'
  | 'my-vacations'
  | 'points-history';

interface IGridTableProps {
  children: React.ReactNode;
  tableClassName: TableClass;
}
const GridTable: React.FC<IGridTableProps> = ({ children, tableClassName }) => {
  return <Table className={`table ${tableClassName}`}>{children}</Table>;
};
export default GridTable;
