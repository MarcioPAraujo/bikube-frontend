import InputComponent from '@/components/Inputs/InputComponent';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';
import TermsOfUseModal from '@/components/modals/TermsOfUsemodal/TermsOfUseModal';
import AlertModal from '@/components/modals/AlertModal/AlertModal';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import { CustomLink, Form, SubmitButton, Title } from '../styles';
import useCandidateLoginForm from './useCandidateLoginForm';

const CandidateLoginForm: React.FC = () => {
  const {
    hookform: { errors, isValid, isSubmitting, handleSubmit, register },
    modalStates: { temporaryBlocked, setTemporaryBlocked, blocked, setBlocked },
    onEmailChange,
    onFormSubmit,
    onAcceptterms,
    termsAccepted,
    setTermsAccepted,
  } = useCandidateLoginForm();

  return (
    <>
      <AlertModal
        isOpen={temporaryBlocked}
        title="Atenção"
        message="Sua conta foi bloqueada temporariamente devido a múltiplas tentativas de login falhadas. Por favor, tente novamente mais tarde ou entre em contato com o suporte."
        confirmText="OK"
        onConfirm={() => setTemporaryBlocked(false)}
      />
      <WarningModal
        isOpen={blocked}
        title="Conta Desativada"
        message="Sua conta foi desativada. Por favor, entre em contato com o suporte para mais informações."
        confirmText="OK"
        onConfirm={() => setBlocked(false)}
      />

      <TermsOfUseModal
        isOpen={termsAccepted}
        onSubmit={e => {
          e.preventDefault();
          onAcceptterms();
        }}
        type="candidate"
        onClose={() => setTermsAccepted(false)}
      />

      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Title>Login</Title>
        <InputComponent
          id="email"
          labelText="Email"
          placeholder="Insira seu email"
          register={register('email', {
            onChange: e => onEmailChange(e.target.value),
          })}
          errorMessage={errors.email?.message}
        />
        <PasswordInput
          id="password"
          labelText="Senha"
          placeholder="Insira sua senha"
          register={register('password')}
          errorMessage={errors.password?.message}
        />
        <CustomLink href="/candidato-email">Esqueci a senha</CustomLink>
        <CustomLink href="/candidato-registro/credenciais-de-acesso">
          Primeiro acesso
        </CustomLink>
        <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
          Entrar
        </SubmitButton>
      </Form>
    </>
  );
};
export default CandidateLoginForm;
