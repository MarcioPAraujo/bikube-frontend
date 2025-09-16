import Image from 'next/image';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import { useState } from 'react';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { ButtonProfile, ButtonWrapper, Header } from './styles';

enum Routes {
  CANDIDATE_PROFILE = '/area-do-candidato/meu-perfil',
}

const CandidateHomeHeader: React.FC = () => {
  const { logout } = useCandidateAuth();
  const router = useRouter();
  const [warningModal, setWarningModal] = useState(false);
  return (
    <>
      <WarningModal
        isOpen={warningModal}
        title="Deseja sair da sua conta?"
        message="Você será redirecionado para a página de login."
        cancelText="Cancelar"
        confirmText="Sair"
        onCancel={() => setWarningModal(false)}
        onConfirm={logout}
      />

      <Header>
        <Image
          alt="logo bikube"
          src="/images/default-logo.png"
          width={180}
          height={80}
          priority
        />
        <ButtonWrapper>
          <IconButton
            onClick={() => setWarningModal(true)}
            iconNode={<Icon name="Logout" />}
          />
          <ButtonProfile
            type="button"
            onClick={() => router.push(Routes.CANDIDATE_PROFILE)}
          >
            Meu perfil
          </ButtonProfile>
        </ButtonWrapper>
      </Header>
    </>
  );
};
export default CandidateHomeHeader;
