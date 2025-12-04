import ModalBackground from '@/components/modals/elements/ModalBackground';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import { AcademicDataSchemaType } from '@/validation/candidateRegister/AcademicData';
import { Controller } from 'react-hook-form';
import UnderlinedSelect from '@/components/Inputs/UndelinedSelect/UnderlinedSelect';
import RadioInput from '@/components/Inputs/Radio/Radio';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import {
  EducationContainer,
  EducationWrapper,
  FieldWrapper,
  Form,
  LanguagesContainer,
  OptionsWrapper,
  Section,
} from './styles';
import EditSubmitButtons from '../Elements/EditSubmitButtons/EditSubmitButtons';
import EditFormTitle from '../Elements/EditFormTitle/EditFormTitle';
import useEditAcademicBackgroundForm from './useEditAcademicBackgroundForm';
import AddButton from '../Elements/AddButton/AddButton';
import RemoveButton from '../Elements/RemoveButton/RemoveButton';

interface EditAcademicBackgroundFormProps {
  isOpen: boolean;
  defaultValues: AcademicDataSchemaType;
  data: ICandidateDetailsResponse;
  onClose: () => void;
  refetch: VoidFunction;
}

const EditAcademicBackgroundForm: React.FC<EditAcademicBackgroundFormProps> = ({
  isOpen,
  defaultValues,
  data,
  onClose,
  refetch,
}) => {
  const {
    handleClose,
    onDateChange,
    onFormSubmit,
    setWarningModalOpen,
    levels,
    languagesList,
    warningModalOpen,
    successModalOpen,
    hookform: { control, register, handleSubmit, errors, isSubmitting },
    educationFieldArray: { appendEducation, removeEducation, educationArray },
    languageFieldArray: { addLanguage, removeLanguage, languagesArray },
  } = useEditAcademicBackgroundForm(defaultValues, onClose, data, refetch);

  if (!isOpen) return null;

  if (successModalOpen) {
    return (
      <SuccessModal
        isOpen={successModalOpen}
        title="Formação acadêmica atualizada com sucesso!"
        message="As suas informações de formação acadêmica foram atualizadas com sucesso."
        buttonText="Ok"
        onClose={() => {
          handleClose();
          refetch();
        }}
      />
    );
  }

  if (warningModalOpen) {
    return (
      <WarningModal
        isOpen={warningModalOpen}
        title="Descartar alterações?"
        message="Tem certeza que deseja descartar as alterações feitas? As informações não salvas serão perdidas."
        cancelText="Continuar editando"
        confirmText="Descartar alterações"
        onCancel={() => setWarningModalOpen(false)}
        onConfirm={handleClose}
      />
    );
  }
  return (
    <ModalBackground>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <EditFormTitle title="Editar formação acadêmica" />
        <Section>
          <LanguagesContainer>
            <AddButton
              label="+ Idioma"
              onClick={() => addLanguage({ language: '', level: '1' })}
              disabled={languagesArray.length >= 5}
            />
            {languagesArray.map((lang, index) => (
              <FieldWrapper key={lang.id}>
                <Controller
                  control={control}
                  name={`languages.${index}.language`}
                  render={({ field }) => (
                    <UnderlinedSelect
                      id={`languages.${index}.language`}
                      enableSearch
                      label="Idioma"
                      placeholder="Selecione o idioma"
                      options={languagesList}
                      selectedOption={field.value}
                      onChange={field.onChange}
                      error={errors.languages?.[index]?.language}
                    />
                  )}
                />
                <OptionsWrapper>
                  <div>
                    {levels.map(level => (
                      <RadioInput
                        key={`${lang.id}${level.value}`}
                        id={`${lang.id}${level.value}`}
                        label={level.label}
                        value={level.value}
                        register={register(`languages.${index}.level`)}
                      />
                    ))}
                  </div>
                  <div>
                    <RemoveButton onClick={() => removeLanguage(index)} />
                  </div>
                </OptionsWrapper>
              </FieldWrapper>
            ))}
          </LanguagesContainer>
          <EducationContainer>
            <AddButton
              label="+ Formação"
              disabled={educationArray.length >= 3}
              onClick={() =>
                appendEducation({
                  instituition: '',
                  course: '',
                  startDate: '',
                  endDate: '',
                })
              }
            />
            {educationArray.map((field, index) => (
              <EducationWrapper key={field.id}>
                <UnderlinedInput
                  id={`instituition-${field.id}`}
                  labelText="Instituição"
                  placeholder="Nome da instituição"
                  register={register(`education.${index}.instituition`)}
                  errorType={errors.education?.[index]?.instituition}
                />
                <UnderlinedInput
                  id={`course-${field.id}`}
                  labelText="Curso"
                  placeholder="Nome do curso"
                  register={register(`education.${index}.course`)}
                  errorType={errors.education?.[index]?.course}
                />
                <UnderlinedInput
                  id={`startDate-${field.id}`}
                  labelText="Data de início"
                  placeholder="DD/MM/AAAA"
                  register={register(`education.${index}.startDate`, {
                    onChange: e => {
                      onDateChange(e.target.value, index, 'startDate');
                    },
                  })}
                  errorType={errors.education?.[index]?.startDate}
                />
                <UnderlinedInput
                  id={`endDate-${field.id}`}
                  labelText="Data de conclusão"
                  placeholder="DD/MM/AAAA"
                  register={register(`education.${index}.endDate`, {
                    onChange: e => {
                      onDateChange(e.target.value, index, 'endDate');
                    },
                  })}
                  errorType={errors.education?.[index]?.endDate}
                />
                <div>
                  <RemoveButton onClick={() => removeEducation(index)} />
                </div>
              </EducationWrapper>
            ))}
          </EducationContainer>
        </Section>
        <EditSubmitButtons
          submitButton={{
            labelText: isSubmitting ? 'Salvando...' : 'Salvar mudanças',
            disabled: isSubmitting,
          }}
          cancelButton={{
            labelText: 'Cancelar',
            onClick: () => setWarningModalOpen(true),
            disabled: isSubmitting,
          }}
        />
      </Form>
    </ModalBackground>
  );
};
export default EditAcademicBackgroundForm;
