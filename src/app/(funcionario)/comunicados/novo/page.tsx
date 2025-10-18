'use client';

import InputComponent from '@/components/Inputs/InputComponent';
import { useState } from 'react';
import { IOption } from '@/interfaces/option';
import CheckboxComponent from '@/components/Inputs/Checkbox';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import RenderIf from '@/components/RenderIf/RenderIf';
import MultipleOptionsSelect from '@/components/Inputs/MultipleOptionsSelect';
import { useForm, Controller } from 'react-hook-form';
import {
  AnnouncementFormData,
  AnnouncementSchema,
} from '@/validation/AnnouncementSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { useRouter } from 'next/navigation';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import InputAuxTextProps from '@/components/Inputs/InputAuxText/InputAuxText';
import SelectComponent from '@/components/Inputs/Select/Select';
import {
  AnnouncementTypeField,
  ButtonsWrapper,
  CheckboxWrapper,
  FieldsWrapper,
  FormHeader,
  InputLabel,
  InputWrapper,
  TextArea,
} from './styles';

enum DestinataryOption {
  TODOS = 'todos',
  SETORES = 'setores',
  DIRECIONADO = 'direcionado',
}

const destinataryOptions: IOption[] = [
  { label: 'Todos', value: DestinataryOption.TODOS },
  { label: 'Setores', value: DestinataryOption.SETORES },
  { label: 'Colaborador Específico', value: DestinataryOption.DIRECIONADO },
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
const emplyessoptions: IOption[] = Array.from({ length: 50 }, (_, i) => ({
  value: `employee-${i + 1}`,
  label: `Funcionário ${i + 1}`,
}));
const NewAnnouncementPage = () => {
  const router = useRouter();
  const [destinataryOption, setDestinataryOption] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<IOption[]>([]);
  const [warningModal, setWarningModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    mode: 'onTouched',
    resolver: yupResolver(AnnouncementSchema),
  });

  const onSubmit = (data: AnnouncementFormData) => {
    console.log(data);
    setSuccessModal(true);
  };

  console.log('errors', errors);

  return (
    <>
      <SuccessModal
        isOpen={successModal}
        title="Comunicado Enviado"
        message="O comunicado foi criado e enviado com sucesso!"
        buttonText="Voltar"
        onClose={() => router.push('/comunicados')}
      />
      <WarningModal
        isOpen={warningModal}
        title="Cancelar criação do comunicado"
        message="Tem certeza que deseja cancelar a criação do comunicado? As informações preenchidas serão perdidas."
        onConfirm={() => router.push('/comunicados')}
        onCancel={() => setWarningModal(false)}
        confirmText="Sim, cancelar"
        cancelText="Continuar editando"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>
          <h1>Novo comunicado</h1>
          <ButtonsWrapper>
            <DefaultButton
              classname="bordered"
              text="Cancelar"
              onClick={() => setWarningModal(true)}
            />
            <DefaultButton text="Salvar" type="submit" />
          </ButtonsWrapper>
        </FormHeader>
        <FieldsWrapper>
          <div>
            <InputComponent
              id="subject"
              labelText="Assunto"
              placeholder="Digite o assunto do comunicado"
              register={register('title')}
              errorMessage={errors.title?.message}
            />
            <AnnouncementTypeField>
              <CheckboxWrapper>
                {destinataryOptions.map(option => (
                  <CheckboxComponent
                    key={option.value}
                    id={option.value}
                    value={option.value}
                    isChecked={destinataryOption === option.value}
                    onChange={() => {
                      setDestinataryOption(option.value);
                      setValue('type', option.value);
                      trigger('type');
                    }}
                  >
                    {option.label}
                  </CheckboxComponent>
                ))}
              </CheckboxWrapper>
              <InputAuxTextProps
                text={errors.type?.message}
                variant="ERROR-MESSAGE"
              />
            </AnnouncementTypeField>
            <RenderIf isTrue={destinataryOption === DestinataryOption.SETORES}>
              <MultipleOptionsSelect
                id="sectors"
                label="Setores"
                options={sectorsOptions}
                selectedOption={selectedSectors}
                placeholder="Selecione os setores"
                onChange={opt => {
                  setSelectedSectors(opt);
                  setValue(
                    'sectors',
                    opt.map(item => item.value),
                  );
                  trigger('sectors');
                }}
                errorMessage={errors.sectors?.message}
                enableSearch
              />
            </RenderIf>
            <RenderIf
              isTrue={destinataryOption === DestinataryOption.DIRECIONADO}
            >
              <Controller
                name="directedEmployees"
                control={control}
                render={({ field }) => (
                  <SelectComponent
                    id="directedEmployee"
                    label="Colaborador"
                    options={emplyessoptions}
                    placeholder="Selecione um funcionário"
                    selectedOption={field.value as IOption}
                    onChange={field.onChange}
                    errorMessage={errors.directedEmployees?.label?.message}
                    enableSearch
                  />
                )}
              />
            </RenderIf>
          </div>
          <InputWrapper>
            <InputLabel htmlFor="message">Mensagem</InputLabel>
            <TextArea
              id="message"
              placeholder="Insira a mensagem do comunicado aqui."
              {...register('content')}
            />
            <InputAuxTextProps
              text={errors.content?.message}
              variant="ERROR-MESSAGE"
            />
          </InputWrapper>
        </FieldsWrapper>
      </form>
    </>
  );
};
export default NewAnnouncementPage;
