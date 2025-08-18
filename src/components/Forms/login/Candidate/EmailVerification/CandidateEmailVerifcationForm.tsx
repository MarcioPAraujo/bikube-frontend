import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SendCodeSchema, SendCodeSchemaType } from '@/validation/Login/SendCodeSchema';
import InputComponent from '@/components/Inputs/InputComponent';
import { Description, Form, SubmitButton, Title } from '../styles';
import { emailMask } from '@/utils/masks/emailMask';
import { useRouter } from 'next/navigation';

const CandidateEmailVerificationForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SendCodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(SendCodeSchema),
  });

  const onFormSubmit = (data: SendCodeSchemaType) => {
    console.log(data);
    router.push('/candidato-codigo');
  };

  const onEmailChange = (value: string) => {
    const formattedEmail = emailMask(value);
    setValue('email', formattedEmail);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Email</Title>
      <Description>Insira o email usado no seu cadastro para dar seguimento a redefinição de senha</Description>
      <InputComponent
        id="email"
        labelText="Email"
        placeholder="insira seu email"
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
export default CandidateEmailVerificationForm;
