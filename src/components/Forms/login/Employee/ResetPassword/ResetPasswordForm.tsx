import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema, ResetPasswordSchemaType } from '@/validation/Login/ResetPasswordSchema';
import InputComponent from '@/components/Inputs/InputComponent';
import { Form, SubmitButton, Title } from '../commonStyles';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal';

const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onFormSubmit = (data: ResetPasswordSchemaType) => {
    console.log(data);
    // router.push('/');
    setSuccessModal(true);
  };

  return (
    <>
      <SuccessModal
        isOpen={successModal}
        onClose={() => router.push('/')}
        title="Senha redefinida"
        message="Sua senha foi redefinida com sucesso, agora você pode logar no sistema utilizando a nova senha."
        buttonText="Continuar"
      />

      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Title>Redefinir senha</Title>
        <InputComponent
          id="new-password"
          labelText="Nova senha"
          placeholder="Insira sua nova senha"
          onCopy={e => e.preventDefault()}
          register={register('newPassword')}
          errorMessage={errors.newPassword?.message}
        />
        <InputComponent
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
