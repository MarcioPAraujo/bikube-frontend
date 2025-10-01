import { IOption } from '@/interfaces/option';
import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import RenderIf from '@/components/RenderIf/RenderIf';
import {
  InputContainer,
  Container,
  Label,
  Placeholder,
  Input,
  InputWrapper,
  SelectArea,
  ErrorMessage,
} from './styles';
import OptionsSelect from './Options';

interface ISelectProps {
  id: string;
  options: IOption[];
  selectedOption: IOption[];
  onChange?: (option: IOption[]) => void;
  placeholder: string;
  disabled?: boolean;
  label?: string;
  enableSearch?: boolean;
  errorMessage?: string;
}

const MultipleOptionsSelect: FC<ISelectProps> = ({
  id,
  options,
  selectedOption,
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
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down');
  const filteredOptions: IOption[] = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const isOptionSelected = (option: IOption) => {
    return selectedOption.some(selected => selected.value === option.value);
  };
  const handleOptionClick = (option: IOption) => {
    let updatedOptions: IOption[] = [];
    if (isOptionSelected(option)) {
      updatedOptions = selectedOption.filter(
        selected => selected.value !== option.value,
      );
    } else {
      updatedOptions = [...selectedOption, option];
    }
    if (!onChange) return;
    onChange(updatedOptions);
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
    const handleScroll = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < 200 && spaceAbove > spaceBelow) {
          setOpenDirection('up');
        } else {
          setOpenDirection('down');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setIsOpen]);

  const openClassname = isOpen ? 'opened' : '';
  const disabledClass = disabled ? 'disabled' : '';
  const inputClassname = `${openClassname} ${disabledClass}`.trim();

  return (
    <Container id="select-component">
      {label && <Label>{label}</Label>}
      <SelectArea ref={selectRef}>
        <InputContainer
          id="input-container"
          onClick={toggleSelect}
          className={inputClassname}
          role="button"
          tabIndex={0}
        >
          <RenderIf isTrue={!isOpen || !enableSearch}>
            <Placeholder>{placeholder}</Placeholder>
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
            openDirection={openDirection}
          />
        </RenderIf>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SelectArea>
    </Container>
  );
};
export default MultipleOptionsSelect;
