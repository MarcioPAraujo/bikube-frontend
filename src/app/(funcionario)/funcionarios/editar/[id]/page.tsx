'use client';

import EmployeeForm from '@/components/Forms/EmployeesForm';
import {
  getEmployeeById,
  updateEmployee,
  updateEmployeeAddress,
} from '@/services/funcionarios/funcionariosService';
import formatCurrency from '@/utils/formatCurrency';
import { EmployeesFormValues } from '@/validation/Employees/EmployeesForm';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { EditEmployeeBodyRequest } from '@/interfaces/funcionarios/editEmployeeBodyRequest';
import { notifyError } from '@/utils/handleToast';
import { EditEmployeeAddressBodyRequest } from '@/interfaces/funcionarios/editEmployeeAddressBodyRequest';
import { ButtonContainer, TitleWrapper } from './styles';

const formId = 'employeeDetailsForm';

const EmployeeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [successfullEdition, setSuccessfullEdition] = useState(false);
  const [warningModalEdit, setWarningModalEdit] = useState(false);

  /**
   * Fetches the employee details using React Query
   * @returns The employee data along with fetching status
   */
  const { data, isPlaceholderData } = useQuery({
    queryKey: ['employeeEdition', id],
    queryFn: () => getEmployeeById(id),
  });

  /**   * Handles the form submission for editing employee details
   * @param formData - The data submitted from the form
   */
  const onFormSubmit = async (formData: EmployeesFormValues) => {
    if (!data || !data.data) return;

    const oldEmail = data.data.email;
    const oldPhone = data.data.id_telefone.numero;

    const newEmail = formData.email;
    const newPhone = formData.telefone;

    const emailChanged = oldEmail !== newEmail;
    const phoneChanged = oldPhone !== newPhone;

    const salary = Number(formData.salario.replace(/[R$,.]/g, '')) / 100;

    // Prepare the request body for updating employee details
    const body: EditEmployeeBodyRequest = {
      email: oldEmail,
      funcao: formData.funcao,
      salario: salary,
      contabancaria: '00000000',
      idsetor: Number(formData.numerosetor),
      telefone: oldPhone,
      emailnovo: emailChanged ? newEmail : undefined,
      telefonenovo: phoneChanged ? newPhone : undefined,
    };

    // Prepare the request body for updating employee address
    const addressBody: EditEmployeeAddressBodyRequest = {
      funcionarioid: id,
      cep: formData.cep,
      logradouro: formData.logradouro,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado,
      numero: formData.numero,
      complemento: formData.complemento || '',
    };

    /**
     * Sends the update requests for employee details and address
     */
    const response = await updateEmployee(body);
    if (response.error) {
      notifyError(response.error);
      return;
    }
    const addressResponse = await updateEmployeeAddress(addressBody);
    if (addressResponse.error) {
      notifyError(addressResponse.error);
      return;
    }

    setSuccessfullEdition(true);
  };

  // First load or employee not found
  if (!data && !isPlaceholderData) return null;

  // Employee not found
  if (!data || !data.data) {
    return (
      <div>
        <h1>Detalhes do Funcionário</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  /**
   * Formats the employee data to match the EmployeesFormValues interface
   * @returns Formatted employee data
   */
  const employee: EmployeesFormValues = {
    nome: data.data?.nome,
    salario: formatCurrency(data.data.salario),
    funcao: data.data.funcao,
    data_nascimento: format(parseISO(data.data.data_nascimento), 'dd/MM/yyyy'),
    cpf: data.data.cpf,
    email: data.data.email,
    cargo: data.data.cargo,
    contabancaria: '00000000',
    dataentrada: format(parseISO(data.data.dataentrada), 'dd/MM/yyyy'),
    cep: data.data.id_endereco.cep,
    logradouro: data.data.id_endereco.logradouro,
    bairro: data.data.id_endereco.bairro,
    cidade: data.data.id_endereco.cidade,
    estado: data.data.id_endereco.estado,
    numero: data.data.id_endereco.numero,
    complemento: data.data.id_endereco.complemento,
    telefone: data.data.id_telefone.numero,
    numerosetor: data.data.idsetor.id.toString(),
  };

  return (
    <div>
      <WarningModal
        isOpen={warningModalEdit}
        title="Atenção!"
        message="Tem certeza que deseja cancelar as edições feitas nos dados do funcionário?"
        onCancel={() => setWarningModalEdit(false)}
        onConfirm={() => router.push('/funcionarios')}
        confirmText="Sim, cancelar edições"
        cancelText="Continuar editando"
      />
      <SuccessModal
        isOpen={successfullEdition}
        title="Successo!"
        message="Os dados do funcionário foram editados com sucesso."
        buttonText="Voltar para a lista de funcionários"
        onClose={() => router.push('/funcionarios')}
      />
      <div>
        <TitleWrapper>
          <IconButton
            iconNode={<Icon name="ArrowBack" />}
            onClick={() => router.push('/funcionarios')}
          />
          <h1>Detalhes do Funcionário</h1>
        </TitleWrapper>
      </div>
      <ButtonContainer>
        <DefaultButton type="submit" text="Salvar" formId={formId} />
        <DefaultButton
          type="button"
          text="Cancelar"
          variant="bordered"
          onClick={() => setWarningModalEdit(true)}
        />
      </ButtonContainer>
      <EmployeeForm
        formId={formId}
        defaultValues={employee}
        mode="edit"
        onSubmit={onFormSubmit}
      />
    </div>
  );
};
export default EmployeeDetailsPage;
