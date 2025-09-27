'use client';

import CandidateCard from '@/components/CandidateCard/CandidateCard';
import UnderlinedInput from '@/components/Inputs/UnderlinedInput/UnderlinedInput';
import Link from 'next/link';
import { IOption } from '@/interfaces/option';
import Textarea from '@/components/Inputs/Textarea/Textarea';
import SecondaryButton from '@/components/Buttons/SecondaryButton/SecondaryButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/components/modals/SuccessModal/SuccessModal';
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

const academicFormations: IAcademicFormation[] = [
  {
    institution: 'Universidade de São Paulo',
    degree: 'Bacharelado em Ciência da Computação',
    startDate: '01/01/2015',
    endDate: '31/12/2019',
  },
  {
    institution: 'Instituto Tecnológico de Aeronáutica',
    degree: 'Mestrado em Engenharia de Software',
    startDate: '01/01/2020',
    endDate: '31/12/2022',
  },
];
const levels: IOption[] = [
  { label: 'Básico', value: '1' },
  { label: 'Intermediário', value: '2' },
  { label: 'Avançado', value: '3' },
];
const languages: ILanguages[] = [
  {
    level: '3',
    language: 'Inglês',
  },
  {
    level: '2',
    language: 'Espanho',
  },
];
const professionalXperiences: IProfessionalExperience[] = [
  {
    company: 'Google',
    startDate: '01/01/2020',
    endDate: '31/12/2021',
    description:
      'Atuei como desenvolvedor front-end, criando interfaces responsivas e otimizadas para diversos dispositivos. Trabalhei em colaboração com designers e outros desenvolvedores para garantir a melhor experiência do usuário.',
  },
  {
    company: 'Microsoft',
    startDate: '01/01/2022',
    endDate: '31/12/2023',
    description:
      'Liderei uma equipe de desenvolvedores em projetos de grande escala, focando na implementação de novas funcionalidades e na melhoria do desempenho das aplicações. Utilizei metodologias ágeis para gerenciar o fluxo de trabalho e garantir a entrega dentro dos prazos estabelecidos.',
  },
];
const skills: ISkill[] = [
  {
    name: 'JavaScript',
    time: '36',
  },
  {
    name: 'React',
    time: '24',
  },
  {
    name: 'TypeScript',
    time: '18',
  },
];

const CandidateDetailsPage: React.FC = () => {
  const router = useRouter();
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
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
          <SecondaryButton
            text="Avançar para a próxima fase"
            onClick={() => setSuccessModalOpen(true)}
          />
        </TitleContainer>
        <section>
          <SectionTitle>Dados pessoais</SectionTitle>
          <PersonalDataSection>
            <CandidateCardContainer>
              <CandidateCard name="Candidato Exemplo" />
            </CandidateCardContainer>
            <PersonalDataFields>
              <UnderlinedInput
                id="name"
                labelText="Nome completo"
                placeholder=""
                value="Candidato Exemplo"
                disabled
              />
              <UnderlinedInput
                id="email"
                labelText="Email"
                placeholder=""
                value="johnkramer@email.com"
                disabled
              />
              <UnderlinedInput
                id="phone"
                labelText="Telefone"
                placeholder=""
                value="(11) 99999-9999"
                disabled
              />
              <Link href="https://www.linkedin.com/company/embraer/">
                Linkedin
              </Link>
              <Link href="https://github.com/torvalds/linux">Github</Link>
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
