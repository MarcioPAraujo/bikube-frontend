import { Icons } from '@/components/Icons/Icons';
import { ChangeEvent, FC } from 'react';
import { Input, InputContainer } from './styles';

interface ISearchBarProps {
  value: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
const SearchBarComponent: FC<ISearchBarProps> = ({ value, onSearch, placeholder }) => {
  return (
    <InputContainer>
      <Icons.SearchIcon />
      <Input type="text" value={value} placeholder={placeholder} onChange={onSearch} />
    </InputContainer>
  );
};
export default SearchBarComponent;
