'use client';

import { Table } from '@/components/Table/Index/Index';
import { getsectors } from '@/services/setor/setorService';
import { useQuery } from '@tanstack/react-query';

const columns = ['Nome'];
const SectorsPage = () => {
  const { data: sectors, isFetching } = useQuery({
    queryKey: ['sectors'],
    queryFn: () => getsectors(),
  });

  if (isFetching) {
    return <div>Carregando setores...</div>;
  }

  return (
    <div>
      <h1>Setores</h1>
      <Table.Root tableClassName="setores">
        <Table.Header columns={columns} />
        <Table.Body>
          {sectors?.data?.map(sector => (
            <Table.Row key={sector.id}>
              <Table.BodyCell>{sector.nome}</Table.BodyCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export default SectorsPage;
