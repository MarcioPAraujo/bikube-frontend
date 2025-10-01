'use client';

import NewVacancyForm from '@/components/Forms/NewVacancyForm/NewVacancyForm';
import IconButton from '@/components/Buttons/IconButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton/SecondaryButton';
import { Icon } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import { Header, TitleContainer } from './styles';

const FORM_ID = 'new-vacancy-form';
const NewVacancyPage: React.FC = () => {
  const router = useRouter();
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  return (
    <div>
      <WarningModal
        isOpen={warningModalOpen}
        onCancel={() => setWarningModalOpen(false)}
        title="Descartar alterações?"
        confirmText="Descartar"
        cancelText="Cancelar"
        onConfirm={() => router.back()}
        message="Se você sair, todas as alterações feitas serão perdidas."
      />

      <Header>
        <TitleContainer>
          <IconButton
            onClick={() => setWarningModalOpen(true)}
            iconNode={<Icon name="ArrowBack" />}
          />
          <h1>Criar nova vaga</h1>
        </TitleContainer>
        <SecondaryButton type="submit" text="Publicar vaga" formId={FORM_ID} />
      </Header>
      <NewVacancyForm formId={FORM_ID} />
    </div>
  );
};
export default NewVacancyPage;
