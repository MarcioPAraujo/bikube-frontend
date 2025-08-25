import FormTitle from '../FormTitle/FormTitle';
import { Content, Form } from './personalDataFormStyles';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import mobileMask from '@/utils/masks/mobileMask';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import usePersonalDataForm from './usePersonalDataForm';

const PersonalDataForm: React.FC = () => {
  const {
    hookform: { errors, register, handleSubmit },
    states,
    cities,
    selectedState,
    selectedCity,
    setSelectedState,
    setSelectedCity,
    backToPreviousStep,
    storeValue,
    handleStateChange,
    handleCityChange,
    onSubmit,
  } = usePersonalDataForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle onBack={backToPreviousStep} title="Dados pessoais" />
      <Content>
        <UnderlinedInput
          id="name"
          labelText="Nome completo"
          placeholder="Insira seu nome"
          register={register('name', {
            onChange: e => storeValue('name', e.target.value),
          })}
          errorType={errors.name}
        />
        <UnderlinedInput
          id="phone"
          labelText="Telefone"
          placeholder="Insira seu telefone"
          register={register('phoneNumber', {
            onChange: e => storeValue('phoneNumber', mobileMask(e.target.value)),
          })}
          errorType={errors.phoneNumber}
        />
        <UnderlinedInput
          id="birthday"
          labelText="Data de nascimento"
          placeholder="Insira sua data de nascimento"
          register={register('birthday', {
            onChange: e => storeValue('birthday', ddmmyyyyMask(e.target.value)),
          })}
          errorType={errors.birthday}
        />
        <UnderlinedSelect
          id="state"
          enableSearch
          label="Estado"
          placeholder="Selecione seu estado"
          options={states}
          selectedOption={selectedState}
          onChange={handleStateChange}
          error={errors.state}
        />
        <UnderlinedSelect
          id="city"
          label="Cidade"
          placeholder="Selecione sua cidade"
          onChange={handleCityChange}
          options={cities}
          selectedOption={selectedCity}
          enableSearch
          disabled={!selectedState || cities.length === 0}
          error={errors.city}
        />
        <UnderlinedInput
          id="linkedin"
          labelText="Linkedin"
          placeholder="Insira o link do seu perfil"
          register={register('linkedin', {
            onChange: e => storeValue('linkedin', e.target.value),
          })}
          errorType={errors.linkedin}
        />
        <UnderlinedInput
          id="github"
          labelText="Github"
          placeholder="Insira o link do seu perfil"
          register={register('github', {
            onChange: e => storeValue('github', e.target.value),
          })}
          errorType={errors.github}
        />
      </Content>
    </Form>
  );
};
export default PersonalDataForm;
