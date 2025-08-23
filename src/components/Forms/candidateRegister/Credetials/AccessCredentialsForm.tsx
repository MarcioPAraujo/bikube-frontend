import { useRouter } from 'next/navigation';
import FormTitle from '../FormTitle/FormTitle';

const AccessCredentialsForm: React.FC = () => {
  const router = useRouter();
  return (
    <form>
      <FormTitle onBack={() => router.push('/candidato-login')} title="Credenciais de acesso" />
    </form>
  );
};
export default AccessCredentialsForm;
