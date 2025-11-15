'use client';

import { DefaultButton } from '@/components/Buttons/DefaultButton';
import AddNewLanguageModal from '@/components/modals/AddNewLanguageModal/AddNewLanguageModal';
import { Table } from '@/components/Table/Index/Index';
import {
  getLanguages,
  ILanguagesListResponse,
} from '@/services/language/languageService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import usePaginationRange from '@/hooks/usePaginationRange';
import { Page } from './styles';

const LanguagesPage: React.FC = () => {
  const [languagesModal, setLanguagesModal] = useState<boolean>(false);

  /**
   * Fetches the list of languages using React Query
   * @returns The languages data along with fetching status and refetch function
   */
  let languages: ILanguagesListResponse[] = [];
  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
    select: result => result.data || [],
  });

  /**
   * Stores the list of languages or an empty array if no data is available
   * @returns array of languages
   */
  if (data) {
    languages = data;
  }

  /**
   * Sets up pagination for the languages list
   */
  const pagination = usePaginationRange(languages, DEFAULT_PAGE_SIZE);

  // Handles th first load with no languages
  if (languages.length === 0 && !isPlaceholderData) {
    return (
      <>
        <AddNewLanguageModal
          isOpen={languagesModal}
          onClose={() => setLanguagesModal(false)}
          refetch={refetch}
        />
        <Page>
          <DefaultButton
            type="button"
            onClick={() => setLanguagesModal(true)}
            text="Adicionar idioma"
          />
          Nenhum idioma encontrado.
        </Page>
      </>
    );
  }

  // Handles the case when there are no languages after deletions
  if (languages.length === 0) {
    return (
      <>
        <AddNewLanguageModal
          isOpen={languagesModal}
          onClose={() => setLanguagesModal(false)}
          refetch={refetch}
        />
        <Page>
          <DefaultButton
            type="button"
            onClick={() => setLanguagesModal(true)}
            text="Adicionar idioma"
          />
          Nenhum idioma encontrado.
        </Page>
      </>
    );
  }

  return (
    <>
      <AddNewLanguageModal
        isOpen={languagesModal}
        onClose={() => setLanguagesModal(false)}
        refetch={refetch}
      />
      <Page>
        <DefaultButton
          type="button"
          onClick={() => setLanguagesModal(true)}
          text="Adicionar idioma"
        />

        <Table.Root tableClassName="default">
          <Table.Header columns={['nome']} />
          <Table.Body>
            {pagination.currentRows.map(language => (
              <Table.Row key={language.id}>
                <Table.BodyCell>{language.idioma}</Table.BodyCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Pagination
          currentPage={pagination.currentPage}
          setCurrentPage={pagination.setCurrentPage}
          totalOfData={languages.length}
          totalPages={pagination.totalPages}
          totalPaginatedData={pagination.paginatedRows}
        />
      </Page>
    </>
  );
};

export default LanguagesPage;
