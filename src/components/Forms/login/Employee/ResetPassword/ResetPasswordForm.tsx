import { Form, SubmitButton, Title } from '../commonStyles';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';
import useResetPasswordForm from './useResetPasswordForm';

const ResetPasswordForm: React.FC = () => {
  const {
    hookform: { isSubmitting, isValid, errors, register, handleSubmit },
    backToLogin,
    onFormSubmit,
    successModal,
  } = useResetPasswordForm();

  return (
    <>
      <SuccessModal
        isOpen={successModal}
        onClose={backToLogin}
        title="Senha redefinida"
        message="Sua senha foi redefinida com sucesso, agora você pode logar no sistema utilizando a nova senha."
        buttonText="Continuar"
      />

      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Title>Redefinir senha</Title>
        <PasswordInput
          id="new-password"
          labelText="Nova senha"
          placeholder="Insira sua nova senha"
          onCopy={e => e.preventDefault()}
          register={register('newPassword')}
          errorMessage={errors.newPassword?.message}
        />
        <PasswordInput
          id="confirm-password"
          labelText="Confirmar senha"
          placeholder="Digie a senha novamente"
          onPaste={e => e.preventDefault()}
          register={register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
        <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
          Redefinir
        </SubmitButton>
      </Form>
    </>
  );
};
export default ResetPasswordForm;
