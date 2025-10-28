'use client';

import EmployeeForm from '@/components/Forms/EmployeesForm';
import {
  deleteEmployeeById,
  getEmployeeById,
} from '@/services/funcionarios/funcionariosService';
import formatCurrency from '@/utils/formatCurrency';
import { EmployeesFormValues } from '@/validation/Employees/EmployeesForm';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { notifyError } from '@/utils/handleToast';
import { useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import { useAuth } from '@/hooks/useAuth';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { ButtonContainer, RemoveButton, TitleWrapper } from './styles';

const formId = 'employeeDetailsForm';

const EmployeeDetailsPage = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [successfullEdition, setSuccessfullEdition] = useState(false);
  const [successFullRemoval, setSuccessFullRemoval] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [warningModalEdit, setWarningModalEdit] = useState(false);

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['employeeDetails', id],
    queryFn: () => getEmployeeById(id),
  });

  const onFormSubmit = (data: EmployeesFormValues) => {
    console.log('Form submitted with data:', data);
    setSuccessfullEdition(true);
  };

  const handleRemoveEmployee = async () => {
    const response = await deleteEmployeeById(id);
    if (response.error) {
      notifyError(response.error);
      return;
    }
    setSuccessFullRemoval(true);
  };

  if (!data && !isPlaceholderData) return null;

  if (!data || !data.data) {
    return (
      <div>
        <h1>Detalhes do Funcionário</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  const employee: EmployeesFormValues = {
    nome: data.data?.nome,
    salario: formatCurrency(data.data.salario),
    funcao: data.data.funcao,
    data_nascimento: format(parseISO(data.data.data_nascimento), 'dd/MM/yyyy'),
    cpf: data.data.cpf,
    email: data.data.email,
    cargo: data.data.cargo,
    contabancaria: data.data.contabancaria,
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
      <SuccessModal
        isOpen={successFullRemoval}
        title="Successo!"
        message="O processo de deligamento foi ininciado a partir de agora o funcionário não terá mais acesso ao sistema."
        buttonText="Voltar"
        onClose={() => router.push('/funcionarios')}
      />
      <WarningModal
        isOpen={warningModalEdit}
        title="Atenção!"
        message="Tem certeza que deseja cancelar as edições feitas nos dados do funcionário?"
        onCancel={() => setWarningModalEdit(false)}
        onConfirm={() => router.push('/funcionarios')}
        confirmText="Sim, cancelar edições"
        cancelText="Continuar editando"
      />
      <WarningModal
        isOpen={warningModal}
        title="Atenção!"
        message="Tem certeza que deseja iniciar o processo de desligamento deste funcionário?"
        onCancel={() => setWarningModal(false)}
        onConfirm={handleRemoveEmployee}
        confirmText="Sim, iniciar desligamento"
        cancelText="Cancelar"
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
            onClick={() => router.back()}
          />
          <h1>Detalhes do Funcionário</h1>
        </TitleWrapper>
        {user?.role === 'ADMIN' && (
          <RemoveButton type="button" onClick={() => setWarningModal(true)}>
            Dar inicio ao processo de desligamento
          </RemoveButton>
        )}
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
