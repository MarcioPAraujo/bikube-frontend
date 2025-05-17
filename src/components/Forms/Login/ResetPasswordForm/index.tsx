import { Logo } from '@/components/Logo';
import { FormBackground } from '../Elements/Background';
import { Button } from '../Elements/Button';
import { LoginInput } from '../Elements/Input';
import SuccessModal from '@/components/modals/SuccessModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema, IResetPasswordSchema } from '@/validation/Login/ResetPasswordSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ErrorMessage, Input, InputContainer, InputWrapper, Label } from './styles';
import { Icons } from '@/components/Icons/Icons';
import IconButton from '@/components/Buttons/IconButton';
import { resetPassword } from '@/services/login/passwordResetService';
import { notifyError } from '@/utils/handleToast';

const ResetPasswordForm = () => {
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordSchema>({
    resolver: yupResolver(ResetPasswordSchema),
    mode: 'onChange',
  });
  const onSubmit = async (data: IResetPasswordSchema) => {
    console.log(data);
    const body = {
      email: data.email,
      senha: data.newPassword,
    };

    const response = await resetPassword(body);

    if (response.error) {
      notifyError(response.error);
      return;
    }

    setSuccessModal(true);
  };
  return (
    <>
      <SuccessModal
        isOpen={successModal}
        onClose={() => router.push('/')}
        message="Senha redefinida com sucesso. Agora você pode logar no sistema com sua nova senha."
        title="Sucesso!"
        buttonText="Continuar"
      />
      <FormBackground onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <LoginInput
          id="email"
          label="Email"
          type="text"
          placeholder="Digite seu email..."
          register={register('email')}
          errors={errors?.email}
        />
        <InputWrapper>
          <Label htmlFor="new-password">Insira a nova senha</Label>
          <InputContainer>
            <Input
              id="new-password"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Digite sua nova senha..."
              {...register('newPassword')}
            />
            <IconButton
              icon={showNewPassword ? Icons.OpenedEye : Icons.ClosedEye}
              onClick={() => setShowNewPassword(prev => !prev)}
            />
          </InputContainer>
          {errors?.newPassword && <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="confirm">Confirme sua nova senha</Label>
          <InputContainer>
            <Input
              id="confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua nova senha..."
              {...register('confirmPassword')}
            />
            <IconButton
              icon={showConfirmPassword ? Icons.OpenedEye : Icons.ClosedEye}
              onClick={() => setShowConfirmPassword(prev => !prev)}
            />
          </InputContainer>
          {errors?.confirmPassword && <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>}
        </InputWrapper>
        <Button text="Salvar" />
      </FormBackground>
    </>
  );
};
export default ResetPasswordForm;
