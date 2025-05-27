import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  InputContainer,
  Container,
  Label,
  Placeholder,
  SelectedOption,
  Input,
  InputWrapper,
  SelectArea,
  ErrorMessage,
} from './styles';
import OptionsSelect from './components/Options';
import RenderIf from '@/components/RenderIf/RenderIf';
import { IOption } from '@/interfaces/option';
import { Icons } from '@/components/Icons/Icons';

interface ISelectProps {
  id: string;
  options: IOption[];
  selectedOption: IOption;
  setSelectedOption: Dispatch<SetStateAction<IOption>>;
  onChange: (option: IOption) => void;
  placeholder: string;
  disabled?: boolean;
  label?: string;
  enableSearch?: boolean;
  errorMessage?: string;
}

const SelectComponent: FC<ISelectProps> = ({
  id,
  options,
  selectedOption,
  setSelectedOption,
  onChange,
  placeholder,
  label,
  disabled = false,
  enableSearch = false,
  errorMessage,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredOptions: IOption[] = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const handleOptionClick = (option: IOption) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const toggleSelect = () => {
    if (isOpen) {
      setSearchValue('');
    }
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setSearchValue('');
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);
  return (
    <Container id="select-component">
      {label && <Label>{label}</Label>}
      <SelectArea ref={selectRef}>
        <InputContainer
          id="input-container"
          type="button"
          onClick={toggleSelect}
          disabled={disabled}
          className={isOpen ? 'opened' : ''}
        >
          <RenderIf isFalse={enableSearch && isOpen}>
            {selectedOption.label && <SelectedOption>{selectedOption.label}</SelectedOption>}
            {!selectedOption.label && <Placeholder>{placeholder}</Placeholder>}
          </RenderIf>
          <RenderIf isTrue={isOpen && enableSearch}>
            <InputWrapper onClick={e => e.stopPropagation()}>
              <Icons.SearchIcon />
              <Input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Pesquisar..."
              />
            </InputWrapper>
          </RenderIf>
          <Icons.CaretDown className={isOpen ? 'opened' : 'closed'} />
        </InputContainer>
        <RenderIf isTrue={isOpen}>
          <OptionsSelect
            id={id}
            options={filteredOptions}
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
          />
        </RenderIf>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SelectArea>
    </Container>
  );
};
export default SelectComponent;
