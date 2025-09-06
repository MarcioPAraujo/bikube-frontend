import { Icons } from '@/components/Icons/Icons';
import { ChangeEvent, FC } from 'react';
import { Input, InputContainer } from './styles';

interface ISearchBarProps {
  value: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
/**
 * This conponent is meant ot be receive the searched values in lists
 *
 * @param {string} value - searched valuen in the input.
 * @param {function} onSearch - receive the setState of value and as arguement e.target.value.
 * @param {string} placeholder - the placeholder of the input
 * @returns
 */
const SearchBarComponent: FC<ISearchBarProps> = ({
  value,
  onSearch,
  placeholder,
}) => {
  return (
    <InputContainer>
      <Icons.SearchIcon />
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onSearch}
      />
    </InputContainer>
  );
};
export default SearchBarComponent;
