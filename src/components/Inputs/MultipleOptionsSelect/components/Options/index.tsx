import { IOption } from '@/interfaces/option';
import { FC } from 'react';
import { OptionLabel, Options, OptionsContainer, RadioInput } from './styles';

interface Option {
  options: IOption[];
  handleOptionClick: (option: IOption) => void;
  selectedOption: IOption[];
  id: string;
}
const OptionsSelect: FC<Option> = ({
  options,
  selectedOption,
  handleOptionClick,
  id,
}) => {
  const isSelected = (option: IOption) => {
    return selectedOption.some(
      selectedOption => selectedOption.value === option.value,
    );
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
              type="checkbox"
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
