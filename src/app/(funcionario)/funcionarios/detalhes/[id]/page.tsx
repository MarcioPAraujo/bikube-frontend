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
import SellVacationModal from '@/components/modals/SellVacationModal/SellVacationModal';
import ApplyLeaveSickModal from '@/components/modals/ApplyLeaveSickModal/ApplyLeaveSickModal';
import {
  ActionButton,
  BadgeContainer,
  ButtonContainer,
  ButtonsContainer,
  Header,
  RemoveButton,
  SituationBadge,
  SituationGrid,
  SituationStatus,
  TitleWrapper,
  ValueBadge,
} from './styles';

const formId = 'employeeDetailsForm';

const EmployeeDetailsPage = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [successFullRemoval, setSuccessFullRemoval] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [sellVacationModal, setSellVacationModal] = useState(false);
  const [applySickLeaveModal, setApplySickLeaveModal] = useState(false);

  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: ['employeeDetails', id],
    queryFn: () => getEmployeeById(id),
  });

  const handleRemoveEmployee = async () => {
    const response = await deleteEmployeeById(id);
    if (response.error) {
      notifyError(response.error);
      setWarningModal(false);
      return;
    }
    setWarningModal(false);
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

  const { data: employeeData } = data;

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
        isOpen={warningModal}
        title="Atenção!"
        message="Tem certeza que deseja iniciar o processo de desligamento deste funcionário?"
        onCancel={() => setWarningModal(false)}
        onConfirm={handleRemoveEmployee}
        confirmText="Sim, iniciar desligamento"
        cancelText="Cancelar"
      />
      <SellVacationModal
        employeeId={id}
        isOpen={sellVacationModal}
        onClose={() => setSellVacationModal(false)}
        refetch={refetch}
      />
      <ApplyLeaveSickModal
        employeeId={id}
        isOpen={applySickLeaveModal}
        onClose={() => setApplySickLeaveModal(false)}
        refetch={refetch}
      />

      <Header>
        <div>
          <div>
            <TitleWrapper>
              <IconButton
                iconNode={<Icon name="ArrowBack" />}
                onClick={() => router.push('/funcionarios')}
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
            <DefaultButton
              type="button"
              text="Editar funcionário"
              onClick={() => {
                router.push(`/funcionarios/editar/${id}`);
              }}
            />
          </ButtonContainer>
        </div>
        <SituationStatus>
          <SituationGrid>
            <BadgeContainer>
              <SituationBadge>De férias:</SituationBadge>
              <ValueBadge>{employeeData.deFerias ? 'Sim' : 'Não'}</ValueBadge>
            </BadgeContainer>
            <BadgeContainer>
              <SituationBadge>Férias vendidas:</SituationBadge>
              <ValueBadge>{employeeData.venderFerias}</ValueBadge>
            </BadgeContainer>
            <BadgeContainer>
              <SituationBadge>Saldo de férias:</SituationBadge>
              <ValueBadge>{employeeData.feriasDisponiveis}</ValueBadge>
            </BadgeContainer>
            <BadgeContainer>
              <SituationBadge>frações de férias disponíveis:</SituationBadge>
              <ValueBadge>{employeeData.fracoesDisponiveis}</ValueBadge>
            </BadgeContainer>
            <BadgeContainer>
              <SituationBadge>Saldo de atestados:</SituationBadge>
              <ValueBadge>{employeeData.saldoAtestado}</ValueBadge>
            </BadgeContainer>
          </SituationGrid>
          <ButtonsContainer>
            <ActionButton
              type="button"
              onClick={() => setApplySickLeaveModal(true)}
            >
              Aplicar atestado médico
            </ActionButton>
            <ActionButton
              type="button"
              onClick={() => setSellVacationModal(true)}
            >
              Vender férias
            </ActionButton>
          </ButtonsContainer>
        </SituationStatus>
      </Header>
      <EmployeeForm formId={formId} defaultValues={employee} mode="view" />
    </div>
  );
};
export default EmployeeDetailsPage;
