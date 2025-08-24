import { FC } from 'react';
import { OptionLabel, Options, OptionsContainer, RadioInput } from './styles';
import { IOption } from '@/interfaces/option';

interface Option {
  options: IOption[];
  handleOptionClick: (option: IOption) => void;
  selectedOption: IOption;
  id: string;
}
const OptionsSelect: FC<Option> = ({ options, selectedOption, handleOptionClick, id }) => {
  const isSelected = (option: IOption) => {
    return selectedOption.value === option.value;
  };
  return (
    <Options>
      <OptionsContainer>
        {options.map(option => (
          <OptionLabel key={option.value} htmlFor={option.value} className={isSelected(option) ? 'selected' : ''}>
            <RadioInput
              id={option.value}
              type="radio"
              name={id}
              checked={isSelected(option)}
              onChange={() => handleOptionClick(option)}
            />
            {option.label}
          </OptionLabel>
        ))}
      </OptionsContainer>
    </Options>
  );
};
export default OptionsSelect;
