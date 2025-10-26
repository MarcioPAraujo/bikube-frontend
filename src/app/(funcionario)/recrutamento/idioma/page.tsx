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
import { Page } from './styles';

const LanguagesPage: React.FC = () => {
  const [languagesModal, setLanguagesModal] = useState<boolean>(false);

  let languages: ILanguagesListResponse[] = [];
  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
    select: result => result.data || [],
  });

  if (data) {
    languages = data;
  }

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
            {languages.map(language => (
              <Table.Row key={language.id}>
                <Table.BodyCell>{language.idioma}</Table.BodyCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Page>
    </>
  );
};

export default LanguagesPage;
