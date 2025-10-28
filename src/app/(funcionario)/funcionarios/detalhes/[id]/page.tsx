'use client';

import { getEmployeeById } from '@/services/funcionarios/funcionariosService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const EmployeeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['employeeDetails', id],
    queryFn: () => getEmployeeById(id),
  });

  if (!data && !isPlaceholderData) return null;

  if (!data) {
    return (
      <div>
        <h1>Detalhes do Funcionário</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Detalhes do Funcionário</h1>
      <p>ID do Funcionário: {id}</p>
      {/* Aqui você pode adicionar mais detalhes do funcionário, como nome, cargo, etc. */}
    </div>
  );
};
export default EmployeeDetailsPage;
