'use client';

import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { Table } from '@/components/Table/Index/Index';
import { getsectors } from '@/services/setor/setorService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SectorForm } from '@/components/Forms/SetorForm';
import { TopTitle } from './styles';

const columns = ['Nome'];
const SectorsPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {
    data: sectors,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['sectors'],
    queryFn: () => getsectors(),
  });

  if (isFetching) {
    return <div>Carregando setores...</div>;
  }

  return (
    <>
      <SectorForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        successfulSubmit={refetch}
      />

      <div>
        <TopTitle>
          <h1>Setores</h1>
          <DefaultButton
            text="Cadastrar setor"
            onClick={() => setModalOpen(true)}
          />
        </TopTitle>
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
    </>
  );
};
export default SectorsPage;
