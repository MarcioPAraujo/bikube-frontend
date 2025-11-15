'use client';

import InputComponent from '@/components/Inputs/InputComponent';
import { useEffect, useRef, useState } from 'react';
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
import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';
import { getsectors } from '@/services/setor/setorService';
import { IEmployeeResponse } from '@/interfaces/funcionarios/getListOfEmployeesResponse';
import { IAnnouncementBodyRequest } from '@/interfaces/anouncement/announcementsBodyRequest';
import { sendAnnouncement } from '@/services/announcementsService';
import { notifyError } from '@/utils/handleToast';
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

/**
 * Options for the destinatary selection checkboxes
 * @returns Array of IOption objects representing destinatary options
 */
const destinataryOptions: IOption[] = [
  { label: 'Todos', value: DestinataryOption.TODOS },
  { label: 'Setores', value: DestinataryOption.SETORES },
  { label: 'Colaborador Específico', value: DestinataryOption.DIRECIONADO },
];

const NewAnnouncementPage = () => {
  const router = useRouter();
  const [destinataryOption, setDestinataryOption] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<IOption[]>([]);
  const [warningModal, setWarningModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [sectorsOptions, setSectorsOptions] = useState<IOption[]>([]);
  const [employeesOptions, setEmployeesOptions] = useState<IOption[]>([]);

  const allEmployeesRef = useRef<IEmployeeResponse[]>([]);

  /**
   * Initializes the React Hook Form for the announcement form
   * with validation using Yup schema
   * @returns The form methods and state
   */
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

  /**
   * Loads the sectors and employees options on component mount
   * These options are used in the select inputs for destinatary selection
   * The sectors are fetched from the setor service
   * The employees are fetched from the funcionarios service
   */
  useEffect(() => {
    const initialLoad = async () => {
      const sectorsResult = await getsectors();
      if (sectorsResult.data) {
        const sectorsOpts = sectorsResult.data.map(sector => ({
          label: sector.nome,
          value: sector.id.toString(),
        }));
        setSectorsOptions(sectorsOpts);
      }

      const employeesResult = await getListOfEmployees();
      if (employeesResult.data) {
        allEmployeesRef.current = employeesResult.data;
        const employeesOpts = employeesResult.data.map(employee => ({
          label: employee.nome,
          value: employee.id,
        }));
        setEmployeesOptions(employeesOpts);
      }
    };
    initialLoad();
  }, []);

  /**
   * Handles the form submission for creating a new announcement
   * It constructs the payload based on the selected destinatary option
   * and sends the announcement using the announcements service
   * @param data - The form data containing announcement details
   */
  const onSubmit = async (data: AnnouncementFormData) => {
    let employees: IEmployeeResponse[] = [];

    /**
     * Handles the case when the announcement is directed to specific sectors
     */
    if (data.type === DestinataryOption.SETORES) {
      const sectorsIds = new Set(data.sectors as string[]);

      employees = allEmployeesRef.current.filter(employee =>
        sectorsIds.has(employee.idsetor.id.toString()),
      );
    }

    /**
     * Handles the case when the announcement is directed to a specific employee
     */
    if (data.type === DestinataryOption.DIRECIONADO) {
      const directedEmployeeId = data.directedEmployees?.value;
      const directedEmployee = allEmployeesRef.current.find(
        emp => emp.id === directedEmployeeId,
      );
      if (directedEmployee) {
        employees = [directedEmployee];
      }
    }

    /**
     * Handles the case when the announcement is for all employees
     */
    if (data.type === DestinataryOption.TODOS) {
      employees = allEmployeesRef.current;
    }

    /**
     * Constructs the payload and sends the announcement
     */
    const payload: IAnnouncementBodyRequest = {
      titulo: data.title,
      texto: data.content,
      funcionarios: employees,
    };

    /**
     * Sends the announcement and handles success or error responses
     */
    const response = await sendAnnouncement(payload);
    if (response.error) {
      notifyError(response.error);
      return;
    }

    /**
     * Shows the success modal on successful announcement creation
     */
    setSuccessModal(true);
  };

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
                    options={employeesOptions}
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
