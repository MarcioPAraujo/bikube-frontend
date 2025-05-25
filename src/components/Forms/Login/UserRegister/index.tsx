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
import { useState } from 'react';
import { AlertLoginTriesModal } from '@/components/modals/AlertModal';
import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { KeepLoggedInToastModal } from '@/components/modals/KeepLoggedInToastModal';
import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';

interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  role: string;
  email: string;
}

export interface User {
  register: string;
  email: string;
  role: string;
  nome: string;
  id: string;
  setor: string;
}

export function UserRegister() {
  const { setUser } = useAuth();
  const [userData, setUserData] = useState<User>({} as User);
  const router = useRouter();
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [alertMessage, setAlertmessage] = useState<string>('');
  const [keepLoggedInModal, setKeepLoggedInModal] = useState<boolean>(false);
  const [blocked, setBloqued] = useState<boolean>(false);
  const [response, setResponse] = useState<ILoginResponse>({} as ILoginResponse);
  const {
    register,
    setValue,
    getValues,
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

  const getList = async (email: string) => {
    const response = await getListOfEmployees();

    if (response.error) {
      console.error('Error fetching user list:', response.error);
      return;
    }
    const usersList = response.data;
    if (!usersList) {
      console.error('No user list found');
      return;
    }

    const userData = usersList.find(item => item.email === email);
    if (userData) {
      setUserData({
        id: userData.id,
        email: userData.email,
        nome: userData.nome,
        role: userData.cargo,
        register: userData.idusuario.registro,
        setor: userData.id_setor.nome,
      });
    }
  };

  const onSubmit = async (data: ILoginSchema) => {
    const body = {
      registro: data.register,
      senha: data.password,
    };

    const response = await loginAuth(body);

    if (!response.error && response.data) {
      getList(response.data.email);
      setResponse(response.data);
      setKeepLoggedInModal(true);
      return;
    }

    if (response.error === 'Usuario desativado') {
      setBloqued(true);
      setAlertmessage('Devido a multiplas tentativas de login incorretas, seu acesso foi bloqueado permanentemente.');
      setAlertModal(true);
      return;
    }

    const isANumber = !Number.isNaN(Number(response.error));

    if (Number(response.error) === 5) {
      setBloqued(true);
      setAlertmessage('Devido a multiplas tentativas de login incorretas, seu acesso foi bloqueado permanentemente.');
      setAlertModal(true);
      return;
    }

    if (Number(response.error) === 3) {
      setAlertmessage(
        'Detectamos multiplas tentativas de login invcorretas. Seu acesso ao sistema foi bloquieado temporariamente por questões de segurança',
      );
      setAlertModal(true);
      return;
    }

    if (isANumber) {
      notifyError(`Tentavias de login incorretas: ${response.error}`);
      return;
    }

    if (response.error) {
      notifyError(response.error);
    }
  };

  return (
    <>
      <KeepLoggedInToastModal
        isOpen={keepLoggedInModal}
        onStayLoggedIn={() => {
          localStorage.setItem(LOCAL_STORAGE_KEYS.token, response.access_token);
          localStorage.setItem(LOCAL_STORAGE_KEYS.refreshToken, response.refresh_token);
          setUser(userData);
          localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(userData));
          router.push('/dashboard');
        }}
        onJustLogin={() => {
          localStorage.setItem(LOCAL_STORAGE_KEYS.token, response.access_token);
          setUser(userData);
          localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(userData));
          router.push('/dashboard');
        }}
      />
      ,
      <AlertLoginTriesModal
        isOpen={alertModal}
        onClose={() => setAlertModal(false)}
        message={alertMessage}
        textButton="Entendido"
        blocked={blocked}
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
