import InputComponent from '@/components/Inputs/InputComponent';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';
import AlertModal from '@/components/modals/AlertModal/AlertModal';
import TermsOfUseModal from '@/components/modals/TermsOfUsemodal/TermsOfUseModal';
import { KeepLoggedInModal } from '@/components/modals/KeepLoggedInModal/KeepLoggedInModal';
import { CustomLink, Form, SubmitButton, Title } from '../commonStyles';
import useEmployeeLoginForm from './useEmployeeLoginForm';

const EmployeeLoginForm: React.FC = () => {
  const {
    hookform: { errors, handleSubmit, isSubmitting, isValid, register },
    modals: {
      acceptTermsModal,
      setAcceptTermsModal,
      isFIrstAccess,
      keepLoggedInModal,
    },
    onFormSubmit,
    onRegisterFieldChange,
    goToEmailVerification,
    doNotStayLoggedIn,
    stayedLoggedIn,
    onAcceptterms,
  } = useEmployeeLoginForm();

  return (
    <>
      <AlertModal
        isOpen={isFIrstAccess && !acceptTermsModal}
        title="Primeiro Acesso"
        message='Por ser seu primeiro acesso, você precisa alterar sua senha.
      Clique em "Ok" para ser redirecionado à página de redefinição de senha.'
        confirmText="Ok"
        onConfirm={goToEmailVerification}
      />
      <TermsOfUseModal
        isOpen={acceptTermsModal}
        onSubmit={e => {
          e.preventDefault();
          onAcceptterms();
        }}
        type="employee"
        onClose={() => setAcceptTermsModal(false)}
      />
      <KeepLoggedInModal
        isOpen={keepLoggedInModal}
        onJustLogin={doNotStayLoggedIn}
        onStayLoggedIn={stayedLoggedIn}
      />

      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Title>Login</Title>
        <InputComponent
          id="register"
          labelText="Registro do colaborador"
          placeholder="EX: AAAAAA00"
          register={register('register', {
            onChange: e => onRegisterFieldChange(e.target.value),
          })}
          errorMessage={errors.register?.message}
        />
        <PasswordInput
          id="password"
          labelText="Senha"
          placeholder="Insira sua senha"
          register={register('password')}
          errorMessage={errors.password?.message}
        />
        <CustomLink href="/email">Esqueci a senha</CustomLink>
        <SubmitButton type="submit" disabled={isSubmitting || !isValid}>
          Entrar
        </SubmitButton>
      </Form>
    </>
  );
};
export default EmployeeLoginForm;
