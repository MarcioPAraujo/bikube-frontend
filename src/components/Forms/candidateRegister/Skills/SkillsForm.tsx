import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import FormTitle from '../FormTitle/FormTitle';
import { AddButton, Content, Description, FieldWrapper, Form, RemoveButton } from './skillsFormStyles';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import { IOption } from '@/interfaces/option';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import { Icons } from '@/components/Icons/Icons';
import { theme } from '@/styles/theme';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import useSkillsForm from './useSkillsForm';

const skilsOptions: IOption[] = Array.from({ length: 100 }, (_, i) => ({
  label: `Skill ${i + 1}`,
  value: `skill_${i + 1}`,
}));

const SkillsForm = () => {
  const router = useRouter();
  const {
    hookform: { errors, register, handleSubmit, isSubmitting, setValue, control },
    append,
    back,
    fields,
    onRemove,
    onSubmit,
    setSuccessModalOpen,
    successModalOpen,
    storeOnChange,
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
        <FormTitle onBack={back} title="Habilidades e competências" />
        <Content>
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
                    options={skilsOptions}
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
                labelText="Período de experiência (em meses)"
                placeholder='Ex: "12"'
                register={register(`skills.${index}.periodInMonths`, {
                  onChange: e => {
                    const value = e.target.value.replace(/\D/g, '');
                    setValue(`skills.${index}.periodInMonths`, value);
                    storeOnChange(value, index, 'periodInMonths');
                  },
                })}
                errorType={errors.skills?.[index]?.periodInMonths}
              />
              <div>
                <RemoveButton type="button" onClick={() => onRemove(index)} disabled={fields.length === 1}>
                  <Icons.Trash size={20} color={theme.colors.GRAY.hex_747474} />
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
