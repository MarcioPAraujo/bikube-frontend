import { FC, useEffect, useRef, useState } from 'react';
import RenderIf from '@/components/RenderIf/RenderIf';
import { IOption } from '@/interfaces/option';
import { Icon } from '@/components/Icons/Icons';
import OptionsSelect from './Options';
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

interface ISelectProps {
  id: string;
  options: IOption[];
  selectedOption: IOption | undefined;
  onChange: (option: IOption) => void;
  placeholder: string;
  disabled?: boolean;
  label?: string;
  enableSearch?: boolean;
  errorMessage?: string;
  fieldClassName?: string;
}

const SelectComponent: FC<ISelectProps> = ({
  id,
  options,
  selectedOption,
  onChange,
  placeholder,
  label,
  disabled = false,
  enableSearch = false,
  errorMessage,
  fieldClassName,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredOptions: IOption[] = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const handleOptionClick = (option: IOption) => {
    onChange(option);
    setIsOpen(false);
  };

  const toggleSelect = () => {
    if (disabled) return;
    if (isOpen) {
      setSearchValue('');
    }
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setSearchValue('');
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const disabledClass = disabled ? 'disabled' : '';
  const openedClass = isOpen ? 'opened' : '';

  return (
    <Container id="select-component" className={fieldClassName}>
      {label && <Label>{label}</Label>}
      <SelectArea ref={selectRef}>
        <InputContainer
          id="input-container"
          onClick={toggleSelect}
          className={`${disabledClass} ${openedClass}`.trim()}
          role="button"
          tabIndex={0}
        >
          <RenderIf isFalse={enableSearch && isOpen}>
            {selectedOption?.label && (
              <SelectedOption>{selectedOption.label}</SelectedOption>
            )}
            {!selectedOption?.label && <Placeholder>{placeholder}</Placeholder>}
          </RenderIf>
          <RenderIf isTrue={isOpen && enableSearch}>
            <InputWrapper onClick={e => e.stopPropagation()}>
              <Icon name="SearchIcon" />
              <Input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Pesquisar..."
              />
            </InputWrapper>
          </RenderIf>
          <Icon name="CaretDown" className={isOpen ? 'opened' : 'closed'} />
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
