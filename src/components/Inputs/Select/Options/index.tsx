import { FC } from 'react';
import { IOption } from '@/interfaces/option';
import { OptionLabel, Options, OptionsContainer, RadioInput } from './styles';

interface Option {
  options: IOption[];
  handleOptionClick: (option: IOption) => void;
  selectedOption: IOption | undefined;
  id: string;
}
const OptionsSelect: FC<Option> = ({
  options,
  selectedOption,
  handleOptionClick,
  id,
}) => {
  const isSelected = (option: IOption) => {
    if (!selectedOption) return false;
    return selectedOption.value === option.value;
  };
  return (
    <Options>
      <OptionsContainer>
        {options.map(option => (
          <OptionLabel
            key={option.value}
            htmlFor={option.value}
            className={isSelected(option) ? 'selected' : ''}
          >
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
