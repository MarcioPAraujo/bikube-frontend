'use client';

import { useParams } from 'next/navigation';

const EmployeeDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalhes do Funcionário</h1>
      <p>ID do Funcionário: {id}</p>
      {/* Aqui você pode adicionar mais detalhes do funcionário, como nome, cargo, etc. */}
    </div>
  );
};
export default EmployeeDetailsPage;
