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
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import usePaginationRange from '@/hooks/usePaginationRange';
import Pagination from '@/components/Pagination/Pagination';
import { Page } from './styles';

const SkillsPage: React.FC = () => {
  const [skillsModal, setSkillsModal] = useState<boolean>(false);

  /**
   * Fetches the list of skills using React Query
   * @returns The skills data along with fetching status and refetch function
   */
  let skills: ISkillsListResponse[] = [];
  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    select: result => result.data || [],
  });

  /**
   * Stores the list of skills or an empty array if no data is available
   * @returns array of skills
   */
  if (data) {
    skills = data;
  }

  /**
   * Sets up pagination for the skills list
   * @return pagination object containing current rows, page info, and setters
   */
  const pagination = usePaginationRange(skills, DEFAULT_PAGE_SIZE);

  /**
   * Handles th first load with no skills
   * there is not previous data to show and skills length is zero
   */
  if (skills.length === 0 && !isPlaceholderData) {
    return (
      <>
        <AddNewSkillModal
          isOpen={skillsModal}
          onClose={() => setSkillsModal(false)}
          refetch={refetch}
        />
        <Page>
          <DefaultButton
            type="button"
            onClick={() => setSkillsModal(true)}
            text="Adicionar habilidade"
          />
          Nenhuma habilidade encontrada.
        </Page>
      </>
    );
  }

  /**
   * Handles the case when there are no skills after deletions
   */
  if (skills.length === 0) {
    return (
      <>
        <AddNewSkillModal
          isOpen={skillsModal}
          onClose={() => setSkillsModal(false)}
          refetch={refetch}
        />
        <Page>
          <DefaultButton
            type="button"
            onClick={() => setSkillsModal(true)}
            text="Adicionar habilidade"
          />
          Nenhuma habilidade encontrada.
        </Page>
      </>
    );
  }

  /**
   * Renders the skills page with a table of skills and pagination
   */
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
            {pagination.currentRows.map(skill => (
              <Table.Row key={skill.id}>
                <Table.BodyCell>{skill.habilidade}</Table.BodyCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Pagination
          currentPage={pagination.currentPage}
          setCurrentPage={pagination.setCurrentPage}
          totalOfData={skills.length}
          totalPages={pagination.totalPages}
          totalPaginatedData={pagination.paginatedRows}
        />
      </Page>
    </>
  );
};

export default SkillsPage;
