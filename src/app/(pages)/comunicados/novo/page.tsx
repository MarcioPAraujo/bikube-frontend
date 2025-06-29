'use client';

import InputComponent from '@/components/Inputs/InputComponent';
import {
  ButtonsWrapper,
  CheckboxWrapper,
  FieldsWrapper,
  FormHeader,
  InputLabel,
  InputWrapper,
  TextArea,
} from './styles';
import { useState } from 'react';
import { IOption } from '@/interfaces/option';
import CheckboxComponent from '@/components/Inputs/Checkbox';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import RenderIf from '@/components/RenderIf/RenderIf';
import MultipleOptionsSelect from '@/components/Inputs/MultipleOptionsSelect';

const destinataryOptions: IOption[] = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Setores', label: 'Setores' },
  { value: 'Funcionários', label: 'Funcionários' },
  { value: 'Colaborador Específico', label: 'Colaborador Específico' },
];
const sectorsOptions: IOption[] = [
  { value: 'Administrativo', label: 'Administrativo' },
  { value: 'Financeiro', label: 'Financeiro' },
  { value: 'RH', label: 'RH' },
  { value: 'Operacional', label: 'Operacional' },
  { value: 'Comercial', label: 'Comercial' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'TI', label: 'TI' },
  { value: 'Logística', label: 'Logística' },
  { value: 'Suporte', label: 'Suporte' },
];
const NewAnnouncementPage = () => {
  const [destinataryOption, setDestinataryOption] = useState('Todos');
  const [selectedSectors, setSelectedSectors] = useState<IOption[]>([]);
  const [warningModal, setWarningModal] = useState(false);
  return (
    <form>
      <FormHeader>
        <h1>Novo comunicado</h1>
        <ButtonsWrapper>
          <DefaultButton classname="bordered" text="Cancelar" onClick={() => setWarningModal(true)} />
          <DefaultButton text="Salvar" type="submit" />
        </ButtonsWrapper>
      </FormHeader>
      <FieldsWrapper>
        <div>
          <InputComponent id="subject" labelText="Assunto" placeholder="Digite o assunto do comunicado" />
          <CheckboxWrapper>
            {destinataryOptions.map(option => (
              <CheckboxComponent
                key={option.value}
                id={option.value}
                value={option.value}
                isChecked={destinataryOption === option.value}
                onChange={() => setDestinataryOption(option.value)}
              >
                {option.label}
              </CheckboxComponent>
            ))}
          </CheckboxWrapper>
          <RenderIf isTrue={destinataryOption === 'Setores'}>
            <MultipleOptionsSelect
              id="sectors"
              label="Setores"
              options={sectorsOptions}
              selectedOption={selectedSectors}
              setSelectedOption={setSelectedSectors}
              placeholder="Selecione os setores"
              onChange={setSelectedSectors}
              enableSearch
            />
          </RenderIf>
        </div>
        <InputWrapper>
          <InputLabel htmlFor="message">Mensagem</InputLabel>
          <TextArea id="message" placeholder="Insira a mensagem do comunicado aqui." />
        </InputWrapper>
      </FieldsWrapper>
    </form>
  );
};
export default NewAnnouncementPage;
