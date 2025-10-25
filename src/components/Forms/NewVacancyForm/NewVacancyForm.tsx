import { useForm, Controller } from 'react-hook-form';
import InputComponent from '@/components/Inputs/InputComponent';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  NewVacancySchema,
  NewVacancySchemaType,
} from '@/validation/NewVacancySchema';
import { FaRegQuestionCircle } from 'react-icons/fa';
import SelectComponent from '@/components/Inputs/Select/Select';
import { IOption } from '@/interfaces/option';
import { useEffect, useRef, useState } from 'react';
import { fetchBrazilianStates } from '@/services/statesAPI';
import { fetchCitiesByState } from '@/services/citiesAPI';
import DefaultTextArea from '@/components/Inputs/DefaultTextArea/DefaultTextArea';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { useRouter } from 'next/navigation';
import { notifyError } from '@/utils/handleToast';
import { getSkills } from '@/services/skilss/skilssService';
import { Icon } from '@/components/Icons/Icons';
import MultipleOptionsSelect from '@/components/Inputs/MultipleOptionsSelect';
import { IVacancyBodyRequest } from '@/interfaces/vacancy/vacancyBodyRequest';
import { createNewVancancy } from '@/services/vacancy/vacancyService';
import {
  getCandidatesBySkills,
  sendEmailNewVacancy,
} from '@/services/candidate/candidateService';
import {
  GridContainer,
  Input,
  KeyWords,
  KeywordsBox,
  KeyWordsInputContainer,
  KeyWordsWrapper,
  Label,
  KeyWordItem,
  DragSection,
  DragBox,
  DragItem,
} from './styles';

interface NewVacancyFormProps {
  formId: string;
}

const contractTypeOptions: IOption[] = [
  { label: 'CLT', value: 'clt' },
  { label: 'PJ', value: 'pj' },
  { label: 'Freelancer', value: 'freelancer' },
];
const levelOptions: IOption[] = [
  { label: 'Júnior', value: 'iniciante' },
  { label: 'Pleno', value: 'intermediario' },
  { label: 'Sênior', value: 'avancado' },
];

const NewVacancyForm: React.FC<NewVacancyFormProps> = ({ formId }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<NewVacancySchemaType>({
    resolver: yupResolver(NewVacancySchema),
    mode: 'onTouched',
  });
  const router = useRouter();
  const [skillsOptions, setSkillsOptions] = useState<IOption[]>([]);
  const [statesOptions, setStatesOptions] = useState<IOption[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<IOption[]>([]);
  const [skills, setSkills] = useState<string[] | null>(null);
  const [sucessModalOpen, setSucessModalOpen] = useState(false);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const selectedState = watch('state');

  useEffect(() => {
    const getStates = async () => {
      const result = await fetchBrazilianStates();
      const formattedStates = result.map(state => ({
        label: state.nome,
        value: state.sigla,
      }));
      setStatesOptions(formattedStates);
    };

    const retrieveSkills = async () => {
      const result = await getSkills();
      if (result.error) {
        notifyError(result.error);
        return;
      }
      if (result.data) {
        const options = result.data.map(skill => ({
          label: skill.habilidade,
          value: skill.habilidade,
        }));
        setSkillsOptions(options);
      }
    };

    retrieveSkills();

    getStates();
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setCitiesOptions([]);
      return;
    }

    const getCities = async () => {
      const result = await fetchCitiesByState(selectedState.value);
      const formattedCities = result.map(city => ({
        label: city.nome,
        value: city.nome,
      }));
      setCitiesOptions(formattedCities);
    };
    getCities();
  }, [selectedState]);

  const onFormSubmit = async (data: NewVacancySchemaType) => {
    const skillsForBody = skills
      ? skills.map((skill, index) => ({
          habilidade: skill,
          peso: skills.length - index,
        }))
      : [];
    const body: IVacancyBodyRequest = {
      titulo: data.title,
      modelo: data.workModel,
      descricao: data.description,
      tipoContrato: data.contractType.value,
      localizacao: `${data.city.label} - ${data.state.value}`,
      informacoes: data.aditionalInfo || '',
      palavrasChave: data.keyWords ? data.keyWords.join(' ') : '',
      nivel: data.level.value,
      habilidades: skillsForBody,
    };

    const result = await createNewVancancy(body);
    if (result.error) {
      notifyError(result.error);
      return;
    }

    const skillsLabels = data.skills
      ? data.skills.map(skill => skill.label)
      : [];

    const cadidatesBySkillsResult = await getCandidatesBySkills(skillsLabels);

    if (cadidatesBySkillsResult.error) {
      notifyError(cadidatesBySkillsResult.error);
      return;
    }

    const candidates = cadidatesBySkillsResult.data || [];

    if (candidates.length > 0) {
      const emailBody = {
        tituloVaga: data.title,
        candidatos: candidates,
      };

      // send email to candidates about new vacancy
      // since it's a background task, we don't wait for its result
      sendEmailNewVacancy(emailBody);
    }

    setSucessModalOpen(true);
  };

  /* keywords handlers */
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    const inputValue = e.currentTarget.value.trim();
    if (!inputValue) return;

    const currentKeywords = watch('keyWords') || [];
    if (currentKeywords.includes(inputValue)) return;

    setValue('keyWords', [...currentKeywords, inputValue.toLowerCase()]);
    e.currentTarget.value = '';
    trigger('keyWords');
  };
  const handleKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/\s+/g, ' ');
    e.target.value = cleanedValue;
  };
  const handleRemoveKeyword = (keyword: string) => {
    const currentKeywords = watch('keyWords') || [];
    const updatedKeywords = currentKeywords.filter(kw => kw !== keyword);
    setValue('keyWords', updatedKeywords);
    trigger('keyWords');
  };

  /* drag and drop handlers */
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    position: number,
  ) => {
    dragItem.current = position;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    position: number,
  ) => {
    dragOverItem.current = position;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (dragItem.current === null || dragOverItem.current === null) return;

    const wordsCopy = [...(skills || [])];

    const [draggedWord] = wordsCopy.splice(dragItem.current, 1);
    wordsCopy.splice(dragOverItem.current, 0, draggedWord);

    setSkills(wordsCopy);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <>
      <SuccessModal
        isOpen={sucessModalOpen}
        title="Vaga criada com sucesso!"
        onClose={() => router.back()}
        buttonText="OK"
        message="A nova vaga foi criada e publicada com sucesso."
      />

      <form id={formId} onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <InputComponent
            id="title"
            labelText="Título"
            placeholder="Digite o título da vaga"
            register={register('title')}
            errorMessage={errors.title?.message}
          />
          <InputComponent
            id="workModel"
            labelText="Modelo de Trabalho"
            placeholder="Digite o modelo de trabalho"
            register={register('workModel')}
            errorMessage={errors.workModel?.message}
          />
          <Controller
            name="contractType"
            control={control}
            render={({ field }) => (
              <SelectComponent
                id="contractType"
                selectedOption={field.value}
                onChange={field.onChange}
                label="Tipo de Contrato"
                placeholder="Selecione o tipo de contrato"
                options={contractTypeOptions}
                errorMessage={errors.contractType?.label?.message}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <SelectComponent
                id="state"
                enableSearch
                selectedOption={field.value}
                onChange={opt => {
                  field.onChange(opt);
                  setCitiesOptions([]);
                  setValue('city', {} as IOption);
                }}
                label="Estado"
                placeholder="Selecione o estado"
                options={statesOptions}
                errorMessage={errors.state?.label?.message}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <SelectComponent
                id="city"
                enableSearch
                selectedOption={field.value}
                onChange={field.onChange}
                label="Cidade"
                placeholder="Selecione a cidade"
                options={citiesOptions}
                errorMessage={errors.city?.label?.message}
                disabled={citiesOptions.length === 0}
              />
            )}
          />
          <Controller
            name="level"
            control={control}
            render={({ field }) => (
              <SelectComponent
                id="level"
                selectedOption={field.value}
                onChange={field.onChange}
                label="Nível"
                placeholder="Selecione o nível"
                options={levelOptions}
                errorMessage={errors.level?.label?.message}
              />
            )}
          />
          <DefaultTextArea
            id="description"
            labelText="Descrição"
            placeholder="Descreva a vaga"
            register={register('description')}
            errorMessage={errors.description?.message}
            rows={6}
          />
          <DefaultTextArea
            id="aditionalInfo"
            labelText="Informações Adicionais"
            placeholder="Adicione informações adicionais (opcional)"
            register={register('aditionalInfo')}
            errorMessage={errors.aditionalInfo?.message}
            rows={6}
          />
        </GridContainer>
        <KeyWordsWrapper>
          <KeyWordsInputContainer>
            <Label htmlFor="keyWords">
              Palavras-chave&nbsp;
              <abbr title="pressione enter para adicionar">
                <FaRegQuestionCircle size={14} />
              </abbr>
            </Label>
            <Input
              id="keyWords"
              type="text"
              placeholder="Digite uma palavra-chave"
              onKeyDown={handleEnterKey}
              onChange={handleKeyWordChange}
            />
          </KeyWordsInputContainer>
          <KeywordsBox>
            {watch('keyWords') &&
              watch('keyWords').length > 0 &&
              !errors.keyWords && (
                <KeyWords>
                  <strong>Palavras-chave adicionadas: </strong>
                  {watch('keyWords').map(word => (
                    <KeyWordItem
                      key={word}
                      type="button"
                      onClick={() => handleRemoveKeyword(word)}
                    >
                      {word}

                      <Icon name="CloseIcon" size={16} />
                    </KeyWordItem>
                  ))}
                </KeyWords>
              )}
            {errors.keyWords && <p>{errors.keyWords.message}</p>}
          </KeywordsBox>
        </KeyWordsWrapper>
        <DragSection>
          <Controller
            control={control}
            name="skills"
            render={({ field }) => (
              <MultipleOptionsSelect
                id="skills"
                label="Habilidades"
                placeholder="Selecione as habilidades"
                enableSearch
                options={skillsOptions}
                selectedOption={field.value || []}
                onChange={options => {
                  field.onChange(options);
                  const skillLabels = options.map(opt => opt.label);
                  setSkills(skillLabels);
                }}
                errorMessage={errors.skills?.message}
              />
            )}
          />
          <DragBox>
            <abbr title="arraste para reordenar as habilidades">
              <FaRegQuestionCircle size={14} />
            </abbr>
            {skills &&
              skills.length > 0 &&
              skills.map((skill, index) => (
                <DragItem
                  key={skill}
                  draggable
                  onDragStart={e => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDragEnter={e => handleDragEnter(e, index)}
                  onDrop={e => handleDrop(e)}
                >
                  {skill}
                </DragItem>
              ))}
          </DragBox>
        </DragSection>
      </form>
    </>
  );
};
export default NewVacancyForm;
