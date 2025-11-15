'use client';

import { DefaultButton } from '@/components/Buttons/DefaultButton';
import EmployeeForm from '@/components/Forms/EmployeesForm';
import LoadingScreen from '@/components/LoadingScreen';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import { IEmployeeBody } from '@/interfaces/funcionarios/registerEmployee';
import { createEmployee } from '@/services/funcionarios/funcionariosService';
import { notifyError } from '@/utils/handleToast';
import { EmployeesFormValues } from '@/validation/Employees/EmployeesForm';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonContainer } from './styles';

const formatDateToISO = (dateStr: string): string => {
  // Parse the string as dd/MM/yyyy
  const parsed = parse(dateStr, 'dd/MM/yyyy', new Date());
  // Format as yyyy-MM-dd
  return format(parsed, 'yyyy-MM-dd');
};

const formId = 'employeeForm';

const RegisterEmployeePage = () => {
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles the form submission for registering a new employee
   * @param data - The data submitted from the form
   */
  const onFormSubmit = async (data: EmployeesFormValues) => {
    setIsSubmitting(true);

    /**
     * Prepares the employee data to match the IEmployeeBody interface
     */
    const employeeData: IEmployeeBody = {
      nome: data.nome,
      salario: parseFloat(
        data.salario.replace(/\./g, '').replace(',', '.').replace('R$', ''),
      ),
      funcao: data.funcao,
      data_nascimento: formatDateToISO(data.data_nascimento),
      cpf: data.cpf,
      email: data.email,
      cargo: data.cargo,
      contabancaria: data.contabancaria,
      dataentrada: formatDateToISO(data.dataentrada),
      cep: data.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      numero: data.numero,
      complemento: data.complemento || '',
      numerotelefone: data.telefone,
      numerosetor: data.numerosetor,
    };

    // Calls the service to create the employee
    const response = await createEmployee(employeeData);

    // Handles any errors from the service
    if (response.error) {
      notifyError(response.error);
      setIsSubmitting(false);
      return;
    }

    // On success, show the success modal
    setIsSubmitting(false);
    setSuccessModal(true);
  };

  return (
    <div>
      <SuccessModal
        isOpen={successModal}
        onClose={() => router.push('/funcionarios')}
        title="Sucesso"
        message="Funcionário cadastrado com sucesso!"
        buttonText="Continuar"
      />
      <WarningModal
        isOpen={warningModal}
        message="Você tem certeza que deseja cancelar o cadastro? Todas as informações serão perdidas."
        title="Cancelar Cadastro"
        confirmText="Sim, cancelar"
        cancelText="Não, continuar"
        onConfirm={() => {
          setWarningModal(false);
          router.push('/funcionarios');
        }}
        onCancel={() => setWarningModal(false)}
      />

      {isSubmitting && <LoadingScreen message="Salvando..." />}

      <h1>Cadastrar Funcionário</h1>
      <ButtonContainer>
        <DefaultButton
          text="Salvar Funcionário"
          type="submit"
          formId={formId}
        />
        <DefaultButton
          text="Cancelar"
          type="button"
          onClick={() => setWarningModal(true)}
          classname="bordered"
        />
      </ButtonContainer>
      <EmployeeForm mode="create" formId={formId} onSubmit={onFormSubmit} />
    </div>
  );
};
export default RegisterEmployeePage;
