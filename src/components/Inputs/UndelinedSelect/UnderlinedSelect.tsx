import RenderIf from '@/components/RenderIf/RenderIf';
import { IOption } from '@/interfaces/option';
import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import { FieldError } from 'react-hook-form';
import {
  Container,
  ErrorMessage,
  Input,
  InputContainer,
  InputWrapper,
  Label,
  Placeholder,
  SelectArea,
  SelectedOption,
} from './styles';
import OptionsSelect from './Options';

interface ISelectProps {
  id: string;
  options: IOption[];
  selectedOption: string | undefined;
  onChange: (option: string) => void;
  placeholder: string;
  disabled?: boolean;
  label?: string;
  enableSearch?: boolean;
  error: FieldError | undefined;
  fieldClassName?: string;
}

const UnderlinedSelect: FC<ISelectProps> = ({
  id,
  options,
  selectedOption,
  onChange,
  placeholder,
  label,
  disabled = false,
  enableSearch = false,
  error,
  fieldClassName,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredOptions: IOption[] = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const handleOptionClick = (option: IOption) => {
    onChange(option.value);
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

  const filledClassname = selectedOption ? 'filled' : '';
  const errorClassname = error ? 'has-error' : '';
  const openClassname = isOpen ? 'opened' : '';
  const inpuytClassname =
    `${errorClassname} ${openClassname} ${filledClassname}`.trim();

  return (
    <Container
      id="select-component"
      className={`${fieldClassName} ${openClassname}`}
    >
      {label && <Label>{label}</Label>}
      <SelectArea ref={selectRef}>
        <InputContainer
          id="input-container"
          type="button"
          onClick={toggleSelect}
          disabled={disabled}
          className={inpuytClassname}
        >
          <RenderIf isFalse={enableSearch && isOpen}>
            {selectedOption && (
              <SelectedOption>{selectedOption}</SelectedOption>
            )}
            {!selectedOption && (
              <Placeholder className={errorClassname}>
                {placeholder}
              </Placeholder>
            )}
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
          <Icon
            name="MdKeyboardArrowDown"
            className={isOpen ? 'opened' : 'closed'}
          />
        </InputContainer>
        <RenderIf isTrue={isOpen}>
          <OptionsSelect
            id={id}
            options={filteredOptions}
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
          />
        </RenderIf>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </SelectArea>
    </Container>
  );
};
export default UnderlinedSelect;
