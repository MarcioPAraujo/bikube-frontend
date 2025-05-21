import { Logo } from '@/components/Logo';
import { FormBackground } from '../Elements/Background';
import { LoginInput } from '../Elements/Input';
import { Button } from '../Elements/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginSchema, ILoginSchema } from '@/validation/Login/LoginSchema';
import { registerMask } from '@/utils/masks/registerMask';
import { useRouter } from 'next/navigation';
import { notifyError } from '@/utils/handleToast';
import { loginAuth } from '@/services/login/loginService';
import { CustomLink } from './styles';
import PasswordInput from '../Elements/PasswordInput';

export function UserRegister() {
  const router = useRouter();
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

    router.push('/dashboard');
  };

  return (
    <>
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
        <PasswordInput
          id="password"
          labelText="Senha"
          placeholder="Digite sua senha..."
          register={register('password')}
          errors={errors.password?.message}
        />
        <CustomLink onClick={() => router.push('/login/enviar-codigo')}>Clique aqui se esqueceu sua senha</CustomLink>
        <Button text="Continuar" />
      </FormBackground>
    </>
  );
}
