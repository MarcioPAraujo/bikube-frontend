import { Logo } from '@/components/Logo';
import { FormBackground } from '../Elements/Background';
import { LoginInput } from '../Elements/Input';
import { Button } from '../Elements/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginSchema, ILoginSchema } from '@/validation/Login/LoginSchema';
import { registerMask } from '@/utils/masks/registerMask';
import { redirect, useRouter } from 'next/navigation';
import { notifyError } from '@/utils/handleToast';
import { loginAuth } from '@/services/login/loginService';
import SuccessModal from '@/components/modals/SuccessModal';
import { useState } from 'react';
import { CustomLink } from './styles';

export function UserRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: yupResolver(LoginSchema),
    mode: 'onChange',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredValue = registerMask(value);
    setValue('register', filteredValue.toLocaleUpperCase());
    trigger('register');
  };
  const onSubmit = async (data: ILoginSchema) => {
    const body = {
      registro: data.register,
      senha: data.password,
    };

    const response = await loginAuth(body);

    if (response.error) {
      notifyError(response.error);
      return;
    }

    redirect('/dashboard');
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
          label="Registro do colaborador"
          placeholder="EX: AAAAAA01"
          type="text"
          register={register('register', {
            onChange: e => handleInputChange(e),
          })}
          errors={errors.register}
        />
        <LoginInput
          id="password"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          register={register('password')}
          errors={errors.password}
        />
        <CustomLink onClick={() => setShowPassword(true)}>Clique aqui se esqueceu sua senha</CustomLink>
        <Button text="Continuar" />
      </FormBackground>
    </>
  );
}
