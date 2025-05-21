import { Logo } from '@/components/Logo';
import { FormBackground } from '../Elements/Background';
import { LoginInput } from '../Elements/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SendCodeSchema, SendCodeSchemaType } from '@/validation/Login/SendCodeSchema';
import { Button } from '../Elements/Button';
import SuccessModal from '@/components/modals/SuccessModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifyError } from '@/utils/handleToast';
import { sendCode } from '@/services/login/sentCodeService';

const SendCodeForm = () => {
  const router = useRouter();
  const [successModal, setSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCodeSchemaType>({
    resolver: yupResolver(SendCodeSchema),
    mode: 'onChange',
  });

  const onFormSubmit = async (data: SendCodeSchemaType) => {
    const response = await sendCode(data.email);

    if (response.error) {
      notifyError(response.error);
      return;
    }

    setSuccessModal(true);
  };

  return (
    <>
      <SuccessModal
        isOpen={successModal}
        onClose={() => router.push('/login/codigo')}
        message="Um código de confimação foi enviadopara seu email informado na sua admissão."
        title="Atenção!"
        buttonText="Continuar"
      />
      <FormBackground onSubmit={handleSubmit(onFormSubmit)}>
        <Logo />
        <LoginInput
          id="register"
          label="Insira o e-mail cadastrado"
          placeholder="EX: meu@email.com"
          type="text"
          register={register('email')}
          errors={errors.email}
        />
        <Button text="Enviar" />
      </FormBackground>
    </>
  );
};
export default SendCodeForm;
