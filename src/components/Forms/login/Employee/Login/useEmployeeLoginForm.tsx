import { useAuth, User } from '@/hooks/useAuth';
import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';
import { loginAuth } from '@/services/login/loginService';
import { termsOfUseService } from '@/services/termsOfUse/termsofUseService';
import { notifyError } from '@/utils/handleToast';
import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { registerMask } from '@/utils/masks/registerMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import {
  EmployeeLoginSchema,
  IEmployeeLoginSchema,
} from '@/validation/Login/EmployeeLoginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

const useEmployeeLoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IEmployeeLoginSchema>({
    resolver: yupResolver(EmployeeLoginSchema),
    mode: 'onTouched',
  });
  const [acceptTermsModal, setAcceptTermsModal] = useState<boolean>(false);
  const [isFIrstAccess, setIsFirstAccess] = useState<boolean>(false);
  const [keepLoggedInModal, setKeepLoggedInModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userData, setUserData] = useState<User>({} as User);
  const [tokens, setTokens] = useState<ITokens>({} as ITokens);

  const onRegisterFieldChange = (value: string) => {
    const formattedRegister = registerMask(value);
    setValue('register', formattedRegister, { shouldValidate: true });
  };

  const onFormSubmit = async (data: IEmployeeLoginSchema) => {
    console.log(data);
    const mockedUser: User = {
      id: '1',
      nome: 'Usuário de Teste',
      email: 'aaaaa2aa.com',
      register: data.register,
      role: 'ADMIN',
      setor: 'TI',
    };
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.employee,
      JSON.stringify(mockedUser),
    );
    setUser(mockedUser);
    /*
    const result = await loginAuth({
      registro: data.register,
      senha: data.password,
    });
    if (result.error) {
      notifyError(result.error);
      return;
    }
    if (!result.data) return;

    const employeesList = await getListOfEmployees();
    if (employeesList.error) {
      notifyError(employeesList.error);
      return;
    }
    if (!employeesList.data) return;

    const employee = employeesList.data.find(
      emp => emp.email === result.data.email,
    );
    if (!employee) {
      notifyError('Funcionário não encontrado');
      return;
    }
    setUserEmail(result.data.email);

    let proceedWithLogin = true;
    if (result.data.termo === 'false') {
      setAcceptTermsModal(true);
      proceedWithLogin = false;
    }
    if (result.data.primeiro_login === 'true') {
      setIsFirstAccess(true);
      proceedWithLogin = false;
    }

    if (!proceedWithLogin) return;

    setUserData({
      email: result.data.email,
      id: employee.id,
      nome: employee.nome,
      register: data.register,
      role: result.data.role,
      setor: employee.id_setor.nome,
    });
    setTokens({
      accessToken: result.data.access_token,
      refreshToken: result.data.refresh_token,
    });

    setKeepLoggedInModal(true);
    */
  };

  const onAcceptterms = async () => {
    const response = await termsOfUseService(userEmail);
    if (response.error) {
      notifyError(response.error);
    }
    setAcceptTermsModal(false);
  };

  const goToEmailVerification = () => {
    router.push('/email');
  };

  const stayedLoggedIn = () => {
    setUser(userData);
    localStorage.setItem(LOCAL_STORAGE_KEYS.employee, JSON.stringify(userData));
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.token,
      JSON.stringify(tokens.accessToken),
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.refreshToken,
      JSON.stringify(tokens.refreshToken),
    );
    setKeepLoggedInModal(false);
  };
  const doNotStayLoggedIn = () => {
    setUser(userData);
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.employee,
      JSON.stringify(userData),
    );
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.token,
      JSON.stringify(tokens.accessToken),
    );
    setKeepLoggedInModal(false);
  };

  const hookform = {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
  };

  const modals = {
    keepLoggedInModal,
    acceptTermsModal,
    setAcceptTermsModal,
    isFIrstAccess,
  };

  return {
    hookform,
    modals,
    onFormSubmit,
    onRegisterFieldChange,
    goToEmailVerification,
    doNotStayLoggedIn,
    stayedLoggedIn,
    onAcceptterms,
  };
};
export default useEmployeeLoginForm;
