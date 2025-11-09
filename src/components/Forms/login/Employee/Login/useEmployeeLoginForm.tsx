import { useAuth, User } from '@/hooks/useAuth';
import { getEmployeeById } from '@/services/funcionarios/funcionariosService';
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
    const result = await loginAuth({
      registro: data.register,
      senha: data.password,
    });
    if (result.error) {
      notifyError(result.error);
      return;
    }
    if (!result.data) return;

    const employee = await getEmployeeById(result.data.idfuncionario);
    if (!employee.data) {
      notifyError('Funcionário não encontrado');
      return;
    }
    userId.current = result.data.idfuncionario;

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
      id: result.data.idfuncionario,
      nome: employee.data.nome,
      register: data.register,
      role: result.data.role,
      setor: employee.data.idsetor.nome,
    };

    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.employee,
      JSON.stringify(userData),
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
