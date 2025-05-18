import { Logo } from '@/components/Logo';
import { FormBackground } from '../Elements/Background';
import { LoginInput } from '../Elements/Input';
import { Button } from '../Elements/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CodeSchema, ICodeSchema } from '@/validation/Login/CodeSchema';
import { useRouter } from 'next/navigation';
import codeMask from '@/utils/masks/codeMask';
import { validateCode } from '@/services/login/validateCodeService';
import { notifyError } from '@/utils/handleToast';

const CodeForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ICodeSchema>({
    resolver: yupResolver(CodeSchema),
    mode: 'onChange',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = codeMask(value); // Remove non-digit characters
    setValue('code', formattedValue);
    trigger('code');
  };

  const onSubmit = async (data: ICodeSchema) => {
    console.log(data);

    const response = await validateCode(data.code);

    if (response.error) {
      notifyError(response.error);
      return;
    }

    router.push('/login/redefinir-senha');
  };

  return (
    <FormBackground onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <LoginInput
        id="register"
        label="Digite o código recebido no seu e-mail"
        placeholder="EX: 000000"
        type="text"
        register={register('code', {
          onChange: e => handleInputChange(e),
        })}
        errors={errors.code}
      />
      <Button text="Confirmar" />
    </FormBackground>
  );
};
export default CodeForm;
