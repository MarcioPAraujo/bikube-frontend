import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import { Icon } from '@/components/Icons/Icons';
import { theme } from '@/styles/theme';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import {
  AddButton,
  CheckboxInput,
  CheckboxLabel,
  Content,
  CustomLink,
  Description,
  FieldWrapper,
  Form,
  RemoveButton,
} from './styles';
import FormTitle from '../FormTitle/FormTitle';
import useSkillsForm from './useSkillsForm';

const SkillsForm = () => {
  const router = useRouter();
  const {
    hookform: {
      errors,
      register,
      handleSubmit,
      isSubmitting,
      control,
      isChecked,
      setIsChecked,
    },
    append,
    back,
    skillsOptions,
    fields,
    onRemove,
    onSubmit,
    setSuccessModalOpen,
    successModalOpen,
    storeOnChange,
    onPeriodChange,
  } = useSkillsForm();

  return (
    <>
      <SuccessModal
        isOpen={successModalOpen}
        buttonText="Ir para o login"
        title="Cadastro concluído com sucesso!"
        message="Agora você pode acessar sua conta e explorar todas as funcionalidades disponíveis."
        onClose={() => {
          setSuccessModalOpen(false);
          router.push('/candidato-login');
        }}
      />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle
          onBack={back}
          title="Habilidades e competências"
          isNextDisabled={isSubmitting}
        />
        <Content>
          <div style={{ position: 'relative' }}>
            <CheckboxLabel>
              <div>
                <CheckboxInput
                  type="checkbox"
                  id="terms"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <Icon name="Check" size={14} color="white" />
              </div>
              Aceitar{' '}
              <CustomLink href="/candidato-registro/termos-de-uso">
                termos de uso
              </CustomLink>{' '}
              e{' '}
              <CustomLink href="/candidato-registro/politicas-de-privacidade">
                política de privacidade
              </CustomLink>
            </CheckboxLabel>
          </div>
          <Description>Adicione até 10 habilidades diferentes</Description>
          <AddButton
            type="button"
            disabled={fields.length === 10}
            onClick={() => append({ competency: '', periodInMonths: '' })}
          >
            + Adicionar habilidade
          </AddButton>
          {fields.map((field, index) => (
            <FieldWrapper key={field.id}>
              <Controller
                name={`skills.${index}.competency`}
                control={control}
                render={({ field }) => (
                  <UnderlinedSelect
                    id={`skills-${index}-competency`}
                    label="Habilidade ou Competência"
                    placeholder="Selecione"
                    options={skillsOptions}
                    selectedOption={field.value}
                    onChange={(value: string) => {
                      field.onChange(value);
                      storeOnChange(value, index, 'competency');
                    }}
                    error={errors.skills?.[index]?.competency}
                    enableSearch
                  />
                )}
              />
              <UnderlinedInput
                id={`skills-${index}-periodInMonths`}
                labelText="Período de experiência (em meses) - máx 360 meses"
                placeholder='Ex: "12"'
                register={register(`skills.${index}.periodInMonths`, {
                  onChange: e => onPeriodChange(e, index),
                })}
                errorType={errors.skills?.[index]?.periodInMonths}
              />
              <div>
                <RemoveButton
                  type="button"
                  onClick={() => onRemove(index)}
                  disabled={fields.length === 1}
                >
                  <Icon
                    name="Trash"
                    size={20}
                    color={theme.colors.GRAY.hex_747474}
                  />
                </RemoveButton>
              </div>
            </FieldWrapper>
          ))}
        </Content>
      </Form>
    </>
  );
};
export default SkillsForm;
