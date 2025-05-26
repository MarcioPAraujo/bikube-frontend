import { GridHeader, GridHeaderCell } from './styles';

interface IHeaderProps {
  columns: (string | React.ReactNode)[];
}
const Header: React.FC<IHeaderProps> = ({ columns }) => {
  return (
    <GridHeader className="table-header">
      {columns.map((header, index) => (
        <GridHeaderCell key={index}>{header}</GridHeaderCell>
      ))}
    </GridHeader>
  );
};
export default Header;
