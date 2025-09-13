'use client';

import { useState } from 'react';
import EditPersonalDataForm from '@/components/Forms/candidateEdition/EditPersonalData/EditPersonalDataForm';
import EditAcademicBackgroundForm from '@/components/Forms/candidateEdition/EditAcademicBackground/EditAcademicBackgroundForm';
import EditProfessionalExperience from '@/components/Forms/candidateEdition/EditProfessionalExperirence/EditProfesionalExperience';
import EditSkillsForm from '@/components/Forms/candidateEdition/EditSkills/EditSkillsForm';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import { Icon } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  DeleteCandidateById,
  getCandidateById,
} from '@/services/candidate/candidateService';
import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { notifyError } from '@/utils/handleToast';
import { ICandidateDetailsResponse } from '@/interfaces/candidate/cadidateDetailsResponse';
import { stateNames } from '@/utils/statesNames';
import { languageLevels } from '@/utils/languageLevel';
import { format, parseISO } from 'date-fns';
import {
  DeleteButton,
  EditButton,
  HomeButton,
  PageContainer,
  Paragraph,
  SectionContent,
  SectionsContainer,
  SectionTitle,
  Subtitle,
  Title,
  TitleWrapper,
} from './styles';

const MyProfilePage: React.FC = () => {
  const { candidate } = useCandidateAuth();
  const router = useRouter();
  const [personalDataFormVisible, setPersonalDataFormVisible] = useState(false);
  const [academicFormVisible, setAcademicFormVisible] = useState(false);
  const [experienceFormVisible, setExperienceFormVisible] = useState(false);
  const [skillsFormVisible, setSkillsFormVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ['candidateProfile'],
    queryFn: () => getCandidateById(Number(candidate?.id) || 0),
    placeholderData: keepPreviousData,
  });

  const handleDeleteAccount = async () => {
    const resutl = await DeleteCandidateById(Number(candidate?.id) || 0);
    if (resutl.error) {
      notifyError(resutl.error);
    }
    setWarningModalVisible(false);
  };

  if (isPending) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os dados.</div>;
  }

  if (!data || !data.data) return <div>Dados não disponíveis.</div>;

  return (
    <>
      <EditPersonalDataForm
        isOpen={personalDataFormVisible}
        onClose={() => setPersonalDataFormVisible(false)}
        data={data.data || ({} as ICandidateDetailsResponse)}
        defaultValues={{
          name: data.data?.nome || '',
          phoneNumber: data.data?.telefone || '',
          state: data.data?.estado || '',
          city: data.data?.cidade || '',
          linkedin: data.data?.linkedin || '',
          github: data.data?.github || '',
          birthday: '01/01/1990',
        }}
      />
      <EditAcademicBackgroundForm
        isOpen={academicFormVisible}
        onClose={() => setAcademicFormVisible(false)}
        defaultValues={{
          languages:
            data.data?.idiomas.map(lang => ({
              language: lang.idioma,
              level: String(lang.nivel),
            })) || [],
          education:
            data.data?.formacaoAcademica.map(edu => ({
              instituition: edu.instituicao,
              course: edu.curso,
              startDate: format(parseISO(edu.dataInicio), 'dd/MM/yyyy'),
              endDate: format(parseISO(edu.dataFim), 'dd/MM/yyyy'),
            })) || [],
        }}
      />
      <EditProfessionalExperience
        isOpen={experienceFormVisible}
        onClose={() => setExperienceFormVisible(false)}
        defaultValues={{
          isFirstJob: data.data?.experiencias.length === 0,
          experiences:
            data.data?.experiencias.map(exp => ({
              company: exp.empresa,
              startDate: format(parseISO(exp.dataInicio), 'dd/MM/yyyy'),
              endDate: format(parseISO(exp.dataFim), 'dd/MM/yyyy'),
              description: exp.descricao,
            })) || [],
        }}
      />
      <EditSkillsForm
        isOpen={skillsFormVisible}
        onClose={() => setSkillsFormVisible(false)}
        defaultValues={{
          skills:
            data.data?.habilidades.map(skill => ({
              competency: skill.habilidade,
              periodInMonths: skill.tempoExperiencia.toString(),
            })) || [],
        }}
      />
      <WarningModal
        isOpen={warningModalVisible}
        title="Deletar conta"
        message="Tem certeza que deseja deletar sua conta? Essa ação é irreversível e todos os seus dados serão perdidos."
        cancelText="Cancelar"
        confirmText="Deletar"
        onCancel={() => setWarningModalVisible(false)}
        onConfirm={handleDeleteAccount}
      />
      <PageContainer>
        <TitleWrapper>
          <Title>Meu Perfil</Title>
          <HomeButton type="button" onClick={() => router.back()}>
            <Icon name="Home" size={24} />
          </HomeButton>
        </TitleWrapper>
        <DeleteButton
          type="button"
          onClick={() => setWarningModalVisible(true)}
        >
          Deletar conta
        </DeleteButton>
        <SectionsContainer>
          <section>
            <SectionTitle>Dados Pessoais</SectionTitle>
            <EditButton
              type="button"
              onClick={() => setPersonalDataFormVisible(true)}
            >
              Editar
            </EditButton>
            <SectionContent>
              <Paragraph>
                <strong>Nome: </strong>
                {data.data?.nome}
              </Paragraph>
              <Paragraph>
                <strong>Telefone: </strong>
                {data.data?.telefone}
              </Paragraph>
              <Paragraph>
                <strong>Estado: </strong>
                {stateNames[data.data?.estado]}
              </Paragraph>
              <Paragraph>
                <strong>Cidade: </strong>
                {data.data?.cidade}
              </Paragraph>
              <Paragraph>
                <strong>Linkedin: </strong> {data.data?.linkedin}
              </Paragraph>
              <Paragraph>
                <strong>Github: </strong> {data.data?.github}
              </Paragraph>
            </SectionContent>
          </section>
          <section>
            <SectionTitle>Formação acadêmica</SectionTitle>
            <EditButton
              type="button"
              onClick={() => setAcademicFormVisible(true)}
            >
              Editar
            </EditButton>
            <SectionContent className="academic">
              <div>
                <Subtitle>Idiomas</Subtitle>
                {data.data?.idiomas?.map(lang => (
                  <div key={lang.idioma}>
                    <Paragraph>
                      <strong>Idioma: </strong>
                      {lang.idioma}
                    </Paragraph>
                    <Paragraph>
                      <strong>Nível: </strong>
                      {languageLevels[lang.nivel]}
                    </Paragraph>
                  </div>
                ))}
              </div>
              <div>
                <Subtitle>Formações</Subtitle>
                {data.data.formacaoAcademica.map(edu => (
                  <div key={edu.instituicao}>
                    <Paragraph>
                      <strong>Curso: </strong>
                      {edu.curso}
                    </Paragraph>
                    <Paragraph>
                      <strong>Instituição: </strong>
                      {edu.instituicao}
                    </Paragraph>
                    <Paragraph>
                      <strong>Ano de conclusão: </strong>
                      {format(parseISO(edu.dataFim), 'dd/MM/yyyy')}
                    </Paragraph>
                  </div>
                ))}
              </div>
            </SectionContent>
          </section>
          <section>
            <SectionTitle>Experiência profissional</SectionTitle>
            <EditButton
              type="button"
              onClick={() => setExperienceFormVisible(true)}
            >
              Editar
            </EditButton>
            {data.data.experiencias.map(exp => (
              <SectionContent key={exp.empresa}>
                <Paragraph>
                  <strong>Empresa: </strong>
                  {exp.empresa}
                </Paragraph>
                <Paragraph>
                  <strong>Data de início: </strong>
                  {format(parseISO(exp.dataInicio), 'dd/MM/yyyy')}
                </Paragraph>
                <Paragraph>
                  <strong>Data de fim: </strong>
                  {format(parseISO(exp.dataFim), 'dd/MM/yyyy')}
                </Paragraph>
                <Paragraph>
                  <strong>Descrição: </strong>
                  {exp.descricao}
                </Paragraph>
              </SectionContent>
            ))}
          </section>
          <section>
            <SectionTitle>Habilidades</SectionTitle>
            <EditButton
              type="button"
              onClick={() => setSkillsFormVisible(true)}
            >
              Editar
            </EditButton>
            <SectionContent>
              {data.data.habilidades.map(skill => (
                <div key={skill.habilidade}>
                  <Paragraph>
                    <strong>Habilidade: </strong>
                    {skill.habilidade}
                  </Paragraph>
                  <Paragraph>
                    <strong>Tempo de experiência: </strong>
                    {skill.tempoExperiencia}
                  </Paragraph>
                </div>
              ))}
            </SectionContent>
          </section>
        </SectionsContainer>
      </PageContainer>
    </>
  );
};
export default MyProfilePage;
