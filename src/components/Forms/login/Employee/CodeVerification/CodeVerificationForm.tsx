import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CodeSchema, CodeSchemaType } from '@/validation/Login/CodeSchema';
import InputComponent from '@/components/Inputs/InputComponent';
import { Description, Form, SubmitButton, Title } from '../commonStyles';
import codeMask from '@/utils/masks/codeMask';
import { useRouter } from 'next/navigation';

const CodeVerficationForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CodeSchemaType>({
    mode: 'onTouched',
    resolver: yupResolver(CodeSchema),
  });

  const onFormSubmit = (data: CodeSchemaType) => {
    console.log(data);
    router.push('/redefinir-senha');
  };

  const onCodeChange = (codeValue: string) => {
    const formattedCode = codeMask(codeValue);
    setValue('code', formattedCode);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Código de verificação</Title>
      <Description>Insira aqui o código que você recebeu no seu email informado na etapa anterior</Description>
      <InputComponent
        id="code"
        labelText="Código"
        placeholder="EX: 0000"
        register={register('code', {
          onChange: e => onCodeChange(e.target.value),
        })}
        errorMessage={errors.code?.message}
      />
      <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
        Verificar
      </SubmitButton>
    </Form>
  );
};
export default CodeVerficationForm;
