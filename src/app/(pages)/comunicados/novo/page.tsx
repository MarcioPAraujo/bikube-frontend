'use client';

import InputComponent from '@/components/Inputs/InputComponent';

const NewAnnouncementPage = () => {
  return (
    <form>
      <h1>Novo comunicado</h1>
      <InputComponent id="subject" labelText="Assunto" placeholder="Digite o assunto do comunicado" />
    </form>
  );
};
export default NewAnnouncementPage;
