import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SendCodeSchema, SendCodeSchemaType } from '@/validation/Login/SendCodeSchema';
import InputComponent from '@/components/Inputs/InputComponent';
import { Description, Form, SubmitButton, Title } from '../commonStyles';
import { emailMask } from '@/utils/masks/emailMask';
import { useRouter } from 'next/navigation';

const EmailVerificationForm: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SendCodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(SendCodeSchema),
  });

  const onFormSubmit = (data: SendCodeSchemaType) => {
    console.log(data);
    router.push('/codigo');
  };

  const onEmailChange = (value: string) => {
    const formattedEmailValue = emailMask(value);
    setValue('email', formattedEmailValue);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Email</Title>
      <Description>Insira seu email informado na contratação, você receberá o código de confirmação</Description>
      <InputComponent
        id="email"
        labelText="Email"
        placeholder="Insira seu email"
        register={register('email', {
          onChange: e => onEmailChange(e.target.value),
        })}
        errorMessage={errors.email?.message}
      />
      <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
        Enviar
      </SubmitButton>
    </Form>
  );
};
export default EmailVerificationForm;
