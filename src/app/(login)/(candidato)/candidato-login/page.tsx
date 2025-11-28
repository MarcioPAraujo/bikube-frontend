'use client';

import { useRouter } from 'next/navigation';
import IconButton from '@/components/Buttons/IconButton';
import { Icon } from '@/components/Icons/Icons';
import CandidateLoginForm from '@/components/Forms/login/Candidate/Login/CandidateLoginForm';
import { PageContainer } from '../styles';
import { BottomLinksContainer, CustomLink } from './styles';

const CandidateLoginPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageContainer style={{ alignItems: 'flex-start' }}>
      <IconButton
        iconNode={<Icon name="ArrowLeft" />}
        onClick={() => router.push('/')}
      />
      <CandidateLoginForm />
      <BottomLinksContainer>
        <CustomLink href="/candidato-termos-de-uso">Termos de Uso</CustomLink>
        <CustomLink href="/candidato-politicas-de-privacidade">
          Política de Privacidade
        </CustomLink>
      </BottomLinksContainer>
    </PageContainer>
  );
};
export default CandidateLoginPage;
