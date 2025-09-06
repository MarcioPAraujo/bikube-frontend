import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ButtonProfile, Header } from './candidateHomeHeaderStyles';

const CandidateHomeHeader: React.FC = () => {
  const router = useRouter();
  return (
    <Header>
      <Image
        alt="logo bikube"
        src="/images/default-logo.png"
        width={180}
        height={80}
        priority
      />
      <ButtonProfile
        type="button"
        onClick={() => router.push('/area-do-candidato/meu-perfil')}
      >
        Meu perfil
      </ButtonProfile>
    </Header>
  );
};
export default CandidateHomeHeader;
