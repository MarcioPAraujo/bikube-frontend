'use client';

import CandidateCard from '@/components/CandidateCard/CandidateCard';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import Link from 'next/link';
import { IOption } from '@/interfaces/option';
import Textarea from '@/components/Inputs/Textarea/Textarea';
import SecondaryButton from '@/components/Buttons/SecondaryButton/SecondaryButton';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  advanceCadidateToNextStep,
  getCandidateDetailsInVacancy,
} from '@/services/vacancy/vacancyService';
import { Idioma } from '@/interfaces/candidate/candidateProfileEditBodyRequest';
import { format, parseISO } from 'date-fns';
import { notifyError } from '@/utils/handleToast';
import {
  Section,
  EducationFields,
  EductationWrapper,
  LanguagesWrapper,
  PersonalDataFields,
  PersonalDataSection,
  ProfessinalExperienceFields,
  SectionTitle,
  Title,
  SkillsWrapper,
  SectionsContainer,
  TitleContainer,
  CandidateCardContainer,
} from './styles';

interface IAcademicFormation {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}
interface ILanguages {
  level: string;
  language: string;
}
interface IProfessionalExperience {
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}
interface ISkill {
  name: string;
  time: string;
}

const levels: IOption[] = [
  { label: 'Básico', value: '1' },
  { label: 'Intermediário', value: '2' },
  { label: 'Avançado', value: '3' },
];

const CandidateDetailsPage: React.FC = () => {
  const router = useRouter();
  const { candidateId, vacancyId, step } = useParams<{
    candidateId: string;
    vacancyId: string;
    step: string;
  }>();
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['candidateDetails', candidateId, vacancyId],
    queryFn: () =>
      getCandidateDetailsInVacancy(Number(candidateId), Number(vacancyId)),
    enabled: !!candidateId && !!vacancyId,
    placeholderData: keepPreviousData,
  });

  const advanceCandidate = async () => {
    const result = await advanceCadidateToNextStep(
      Number(vacancyId),
      Number(candidateId),
    );
    if (result.error) {
      notifyError(result.error);
      return;
    }
    setSuccessModalOpen(true);
  };

  if (!data && !isPlaceholderData) {
    return (
      <SectionsContainer>
        <TitleContainer>
          <Title>Detalhes do Candidato</Title>
        </TitleContainer>
      </SectionsContainer>
    );
  }

  if (!data || !data.data || !data.data.profile) {
    return (
      <SectionsContainer>
        <TitleContainer>
          <Title>Detalhes do Candidato</Title>
        </TitleContainer>
        <SectionTitle>
          Não foi possível carregar os detalhes do candidato.
        </SectionTitle>
      </SectionsContainer>
    );
  }

  const languages: ILanguages[] = data.data.profile.idiomas.map(
    (lang: Idioma) => ({
      level: lang.nivel.toString(),
      language: lang.idioma,
    }),
  );
  const skills: ISkill[] = data.data.profile.habilidades.map(skill => ({
    name: skill.habilidade,
    time: skill.tempoExperiencia.toString(),
  }));
  const professionalXperiences: IProfessionalExperience[] =
    data.data.profile.experiencias.map(exp => ({
      company: exp.empresa,
      description: exp.descricao,
      endDate: format(parseISO(exp.dataFim), 'dd/MM/yyyy'),
      startDate: format(parseISO(exp.dataInicio), 'dd/MM/yyyy'),
    }));
  const academicFormations: IAcademicFormation[] =
    data.data.profile.formacaoAcademica.map(formation => ({
      institution: formation.instituicao,
      degree: formation.curso,
      endDate: format(parseISO(formation.dataFim), 'dd/MM/yyyy'),
      startDate: format(parseISO(formation.dataInicio), 'dd/MM/yyyy'),
    }));

  return (
    <>
      <SuccessModal
        isOpen={successModalOpen}
        title="Sucesso!"
        message="O candidato foi avançado para a próxima etapa com sucesso."
        buttonText="Fechar"
        onClose={() => router.back()}
      />

      <SectionsContainer>
        <TitleContainer>
          <Title>Detalhes do Candidato</Title>
          {step !== 'oferta' && (
            <SecondaryButton
              text="Avançar para a próxima fase"
              onClick={advanceCandidate}
            />
          )}
        </TitleContainer>
        <section>
          <SectionTitle>Dados pessoais</SectionTitle>
          <PersonalDataSection>
            <CandidateCardContainer>
              <CandidateCard
                name={data.data.profile.nome}
                matchPercentage={data.data.matchPercentage}
              />
            </CandidateCardContainer>
            <PersonalDataFields>
              <UnderlinedInput
                id="name"
                labelText="Nome completo"
                placeholder=""
                value={data.data.profile.nome}
                disabled
              />
              <UnderlinedInput
                id="email"
                labelText="Email"
                placeholder=""
                value={data.data.profile.email}
                disabled
              />
              <UnderlinedInput
                id="phone"
                labelText="Telefone"
                placeholder=""
                value={data.data.profile.telefone}
                disabled
              />
              <Link href={data.data.profile.linkedin} target="_blank">
                Linkedin
              </Link>
              <Link href={data.data.profile.github} target="_blank">
                Github
              </Link>
            </PersonalDataFields>
          </PersonalDataSection>
        </section>
        <Section>
          <SectionTitle>Formação acadêmica</SectionTitle>
          <div>
            <EductationWrapper>
              {academicFormations.map((formation, index) => (
                <EducationFields key={index}>
                  <UnderlinedInput
                    id={`institution-${index}`}
                    labelText="Instituição"
                    placeholder=""
                    value={formation.institution}
                    disabled
                  />
                  <UnderlinedInput
                    id={`degree-${index}`}
                    labelText="Grau"
                    placeholder=""
                    value={formation.degree}
                    disabled
                  />
                  <UnderlinedInput
                    id={`startDate-${index}`}
                    labelText="Data de início"
                    placeholder=""
                    value={formation.startDate}
                    disabled
                  />
                  <UnderlinedInput
                    id={`endDate-${index}`}
                    labelText="Data de término"
                    placeholder=""
                    value={formation.endDate}
                    disabled
                  />
                </EducationFields>
              ))}
            </EductationWrapper>
            <div>
              <SectionTitle>Idiomas</SectionTitle>
              <EductationWrapper>
                {languages.map((lang, index) => (
                  <LanguagesWrapper key={index}>
                    <UnderlinedInput
                      id={`language-${index}`}
                      labelText="Idioma"
                      placeholder=""
                      value={lang.language}
                      disabled
                    />
                    {levels.map(level => {
                      if (level.value === lang.level) {
                        return (
                          <UnderlinedInput
                            key={level.value}
                            id={`level-${index}`}
                            labelText="Nível"
                            placeholder=""
                            value={level.label}
                            disabled
                          />
                        );
                      }
                      return null;
                    })}
                  </LanguagesWrapper>
                ))}
              </EductationWrapper>
            </div>
          </div>
        </Section>
        <Section>
          <SectionTitle>Experiência profissional</SectionTitle>
          <div>
            {professionalXperiences.map((exp, index) => (
              <ProfessinalExperienceFields key={index}>
                <UnderlinedInput
                  id={`company-${index}`}
                  labelText="Empresa"
                  placeholder=""
                  value={exp.company}
                  disabled
                />
                <UnderlinedInput
                  id={`startDateExp-${index}`}
                  labelText="Data de início"
                  placeholder=""
                  value={exp.startDate}
                  disabled
                />
                <UnderlinedInput
                  id={`endDateExp-${index}`}
                  labelText="Data de término"
                  placeholder=""
                  value={exp.endDate}
                  disabled
                />
                <Textarea
                  id={`description-${index}`}
                  label="Descrição"
                  placeholder=""
                  value={exp.description}
                  disabled
                />
              </ProfessinalExperienceFields>
            ))}
          </div>
        </Section>
        <Section>
          <SectionTitle>Habilidades</SectionTitle>
          <SkillsWrapper>
            {skills.map((skill, index) => (
              <LanguagesWrapper key={index}>
                <UnderlinedInput
                  id={`skill-${index}`}
                  labelText="Habilidade"
                  placeholder=""
                  value={skill.name}
                  disabled
                />
                <UnderlinedInput
                  id={`time-${index}`}
                  labelText="Tempo de experiência (em meses)"
                  placeholder=""
                  value={skill.time}
                  disabled
                />
              </LanguagesWrapper>
            ))}
          </SkillsWrapper>
        </Section>
      </SectionsContainer>
    </>
  );
};
export default CandidateDetailsPage;
