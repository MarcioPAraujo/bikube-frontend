import { Logo } from '@/components/Logo';
import { FormBackground } from '../Elements/Background';
import { LoginInput } from '../Elements/Input';
import { Button } from '../Elements/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  PasswordSchema,
  IPasswordSchema,
} from '@/validation/Login/PasswordSchema';
import { useRouter } from 'next/navigation';
import { CustomLink } from './styles';
import { useState } from 'react';
import SuccessModal from '@/components/modals/SuccessModal';

const PasswordForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordSchema>({
    resolver: yupResolver(PasswordSchema),
    mode: 'onChange',
  });
  const onSubmit = (data: IPasswordSchema) => {
    console.log(data);
    router.push('/dashboard');
  };
  return (
    <>
      <SuccessModal
        isOpen={showPassword}
        onClose={() => router.push('/login/codigo')}
        message="Um código de confimação foi enviadopara seu email informado na sua admissão."
        title="Atenção!"
        buttonText="Continuar"
      />
      <FormBackground onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <LoginInput
          id="register"
          label="Digite sua senha"
          placeholder="Insira sua senha..."
          type="text"
          register={register('password')}
          errors={errors.password}
        />
        <CustomLink onClick={() => setShowPassword(true)}>
          Clique aqui se esqueceu sua senha
        </CustomLink>
        <Button text="Entrar" />
      </FormBackground>
    </>
  );
};
export default PasswordForm;
