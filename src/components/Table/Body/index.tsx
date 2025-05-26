import { FC } from 'react';
import { TBody } from './styles';

interface TableBodyProps {
  children: React.ReactNode;
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <TBody className="table-body">{children}</TBody>;
};
export default TableBody;
