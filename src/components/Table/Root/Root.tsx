import { Table } from './styles';

type TableClass =
  | 'setores'
  | 'logs'
  | 'employees'
  | 'announcements'
  | 'default'
  | 'vacations';

interface IGridTableProps {
  children: React.ReactNode;
  tableClassName: TableClass;
}
const GridTable: React.FC<IGridTableProps> = ({ children, tableClassName }) => {
  return <Table className={tableClassName}>{children}</Table>;
};
export default GridTable;
