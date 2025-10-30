import { useAuth, User } from '@/hooks/useAuth';
import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';
import { loginAuth } from '@/services/login/loginService';
import { termsOfUseService } from '@/services/termsOfUse/termsofUseService';
import { notifyError } from '@/utils/handleToast';
import { registerMask } from '@/utils/masks/registerMask';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import {
  EmployeeLoginSchema,
  IEmployeeLoginSchema,
} from '@/validation/Login/EmployeeLoginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

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

  const userId = useRef<string>('');

  const onRegisterFieldChange = (value: string) => {
    const formattedRegister = registerMask(value);
    setValue('register', formattedRegister, { shouldValidate: true });
  };

  const onFormSubmit = async (data: IEmployeeLoginSchema) => {
    /*
    console.log(data);

    const isAdmin = data.password === 'a';
    const isRH = data.password === 'r';

    let role = 'FUNCIONARIO';
    if (isAdmin) role = 'ADMIN';
    if (isRH) role = 'RH';

    const mockedUser: User = {
      id: '1',
      nome: 'Usuário de Teste',
      email: 'aaaaa2aa.com',
      register: data.register,
      role,
      setor: 'TI',
    };
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.employee,
      JSON.stringify(mockedUser),
    );
    setUser(mockedUser);
    */

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
    userId.current = employee.id;

    /*
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
    */

    const userData: User = {
      email: result.data.email,
      id: employee.id,
      nome: employee.nome,
      register: data.register,
      role: result.data.role,
      setor: employee.idsetor.nome,
    };

    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.employee,
      JSON.stringify(userData),
    );
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.token,
      JSON.stringify(result.data.access_token),
    );
    setUser(userData);
  };

  const onAcceptterms = async () => {
    const response = await termsOfUseService(userId.current);
    if (response.error) {
      notifyError(response.error);
    }
    setAcceptTermsModal(false);
  };

  const goToEmailVerification = () => {
    router.push('/email');
  };

  const hookform = {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
  };

  const modals = {
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
    onAcceptterms,
  };
};
export default useEmployeeLoginForm;
