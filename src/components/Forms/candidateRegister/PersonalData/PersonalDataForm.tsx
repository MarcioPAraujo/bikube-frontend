import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import mobileMask from '@/utils/masks/mobileMask';
import ddmmyyyyMask from '@/utils/masks/ddmmyyyyMask';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import { Controller } from 'react-hook-form';
import { stateNames } from '@/utils/statesNames';
import usePersonalDataForm from './usePersonalDataForm';
import { Content, Form } from './styles';
import FormTitle from '../FormTitle/FormTitle';

const PersonalDataForm: React.FC = () => {
  const {
    hookform: { errors, register, handleSubmit, control, setValue },
    states,
    cities,
    selectedState,
    backToPreviousStep,
    storeValue,
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
            onChange: e =>
              storeValue('phoneNumber', mobileMask(e.target.value)),
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
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <UnderlinedSelect
              id="state"
              enableSearch
              label="Estado"
              placeholder="Selecione seu estado"
              options={states}
              selectedOption={stateNames[field.value]}
              onChange={value => {
                field.onChange(value);
                setValue('city', '');
              }}
              error={errors.state}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <UnderlinedSelect
              id="city"
              label="Cidade"
              placeholder="Selecione sua cidade"
              options={cities}
              onChange={value => {
                field.onChange(value);
                storeValue('city', value);
              }}
              selectedOption={field.value}
              enableSearch
              disabled={!selectedState || cities.length === 0}
              error={errors.city}
            />
          )}
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
