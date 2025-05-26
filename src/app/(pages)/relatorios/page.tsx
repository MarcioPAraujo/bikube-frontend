'use client';

import { Table } from '@/components/Table/Index/Index';
import { getLogs } from '@/services/logs/logsService';
import { useQuery } from '@tanstack/react-query';

const columns = ['Registro do funcionário', 'Descrição', 'Data'];
const ReportsPage = () => {
  const { data: logs, isFetching } = useQuery({
    queryKey: ['reports'],
    queryFn: () => getLogs(),
  });

  if (isFetching) return null;

  if (logs?.data?.length === 0) {
    return (
      <div>
        <h1>Relatórios</h1>
        <p>Nenhum relatório encontrado.</p>
        <p>Verifique se há registros de ações dos funcionários.</p>
        <p>Obrigado!</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Relatórios</h1>
      <Table.Root tableClassName="logs">
        <Table.Header columns={columns} />
        {logs?.data?.map(log => (
          <Table.Body key={log.id}>
            <Table.Row>
              <Table.BodyCell>{log.registro}</Table.BodyCell>
              <Table.BodyCell>{log.acao}</Table.BodyCell>
              <Table.BodyCell>
                {new Date(log.data).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Table.BodyCell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table.Root>
    </div>
  );
};
export default ReportsPage;
