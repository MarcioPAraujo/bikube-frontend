import React from 'react';
import { Cell } from './styles';

interface IBodyCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BodyCell: React.FC<IBodyCellProps> = ({ children, ...props }) => {
  return <Cell {...props}>{children}</Cell>;
};
export default BodyCell;
