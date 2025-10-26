'use client';

import { DefaultButton } from '@/components/Buttons/DefaultButton';
import AddNewSkillModal from '@/components/modals/AddNewSkillModal/AddNewSkillModa';
import { Table } from '@/components/Table/Index/Index';
import {
  getSkills,
  ISkillsListResponse,
} from '@/services/skilss/skilssService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Page } from './styles';

const SkillsPage: React.FC = () => {
  const [skillsModal, setSkillsModal] = useState<boolean>(false);

  let skills: ISkillsListResponse[] = [];
  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    select: result => result.data || [],
  });

  if (data) {
    skills = data;
  }

  if (skills.length === 0 && !isPlaceholderData) {
    return <div>Nenhuma habilidade encontrada.</div>;
  }

  if (skills.length === 0) {
    return <div>Nenhuma habilidade encontrada.</div>;
  }

  return (
    <>
      <AddNewSkillModal
        isOpen={skillsModal}
        onClose={() => setSkillsModal(false)}
        refetch={refetch}
      />
      <Page>
        <DefaultButton
          text="Adicionar habilidade"
          onClick={() => setSkillsModal(true)}
        />
        <Table.Root tableClassName="default">
          <Table.Header columns={['nome']} />
          <Table.Body>
            {skills.map(skill => (
              <Table.Row key={skill.id}>
                <Table.BodyCell>{skill.habilidade}</Table.BodyCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Page>
    </>
  );
};

export default SkillsPage;
