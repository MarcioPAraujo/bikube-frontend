import { notifyError } from '@/utils/handleToast';
import { registerMask } from '@/utils/masks/registerMask';
import { EmployeeLoginSchema, IEmployeeLoginSchema } from '@/validation/Login/EmployeeLoginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useEmployeeLoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IEmployeeLoginSchema>({
    resolver: yupResolver(EmployeeLoginSchema),
    mode: 'onTouched',
  });

  const onRegisterFieldChange = (value: string) => {
    const formattedRegister = registerMask(value);
    setValue('register', formattedRegister);
  };

  const onFormSubmit = (data: IEmployeeLoginSchema) => {
    console.log(data);
  };

  const hookform = {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
  };

  return {
    hookform,
    onFormSubmit,
    onRegisterFieldChange,
  };
};
export default useEmployeeLoginForm;
