'use client';

import { useState } from 'react';
import {
  EditButton,
  PageContainer,
  Paragraph,
  SectionContent,
  SectionsContainer,
  SectionTitle,
  Subtitle,
  Title,
} from './styles';
import EditPersonalDataForm from '@/components/Forms/candidateEdition/EditPersonalData/EditPersonalDataForm';

const lnaguages = Array.from({ length: 5 }, (_, i) => ({
  language: `Linguagem ${i + 1}`,
  level: `Nível ${i + 1}`,
}));

const skills = Array.from({ length: 5 }, (_, i) => ({
  skill: `Habilidade ${i + 1}`,
  experienceTime: `Nível ${i + 1}`,
}));

const MyProfilePage: React.FC = () => {
  const [personalDataFormVisible, setPersonalDataFormVisible] = useState(false);
  const [academicFormVisible, setAcademicFormVisible] = useState(false);
  const [experienceFormVisible, setExperienceFormVisible] = useState(false);
  const [skillsFormVisible, setSkillsFormVisible] = useState(false);
  return (
    <>
      <EditPersonalDataForm
        isOpen={personalDataFormVisible}
        onClose={() => setPersonalDataFormVisible(false)}
        defaultValues={{
          name: 'Nome exemplo',
          phoneNumber: '(00) 91230-0900',
          state: 'SP',
          city: 'São Paulo',
          linkedin: 'linkedin.com/in/exemplo',
          github: 'https://github.com/exemplo',
          birthday: '01/01/2000',
        }}
      />
      <PageContainer>
        <Title>Meu Perfil</Title>
        <SectionsContainer>
          <section>
            <SectionTitle>Dados Pessoais</SectionTitle>
            <EditButton type="button" onClick={() => setPersonalDataFormVisible(true)}>
              Editar
            </EditButton>
            <SectionContent>
              <Paragraph>
                <strong>Nome: </strong>Nome exemplo
              </Paragraph>
              <Paragraph>
                <strong>Telefone: </strong>(00) 0 0000-0000
              </Paragraph>
              <Paragraph>
                <strong>Estado: </strong>estado exemplo
              </Paragraph>
              <Paragraph>
                <strong>Cidade: </strong>cidade exemplo
              </Paragraph>
              <Paragraph>
                <strong>Linkedin: </strong> linkedin.com/in/exemplo
              </Paragraph>
              <Paragraph>
                <strong>Github: </strong> github.com/exemplo
              </Paragraph>
            </SectionContent>
          </section>
          <section>
            <SectionTitle>Formação acadêmica</SectionTitle>
            <EditButton type="button" onClick={() => setAcademicFormVisible(true)}>
              Editar
            </EditButton>
            <SectionContent className="academic">
              <div>
                <Subtitle>Idiomas</Subtitle>
                {lnaguages.map((lang, index) => (
                  <div key={index}>
                    <Paragraph>
                      <strong>Idioma: </strong>
                      {lang.language}
                    </Paragraph>
                    <Paragraph>
                      <strong>Nível: </strong>
                      {lang.level}
                    </Paragraph>
                  </div>
                ))}
              </div>
              <div>
                <Subtitle>Formações</Subtitle>
                <Paragraph>
                  <strong>Curso: </strong>Curso exemplo
                </Paragraph>
                <Paragraph>
                  <strong>Instituição: </strong>Instituição exemplo
                </Paragraph>
                <Paragraph>
                  <strong>Ano de conclusão: </strong>2020
                </Paragraph>
              </div>
            </SectionContent>
          </section>
          <section>
            <SectionTitle>Experiência profissional</SectionTitle>
            <EditButton type="button" onClick={() => setExperienceFormVisible(true)}>
              Editar
            </EditButton>
            <SectionContent>
              <Paragraph>
                <strong>Empresa: </strong>Empresa exemplo
              </Paragraph>
              <Paragraph>
                <strong>Data de início: </strong>01/01/2020
              </Paragraph>
              <Paragraph>
                <strong>Data de fim: </strong>31/12/2021
              </Paragraph>
              <Paragraph>
                <strong>Descrição: </strong>Descrição exemplo
              </Paragraph>
            </SectionContent>
          </section>
          <section>
            <SectionTitle>Habilidades</SectionTitle>
            <EditButton type="button" onClick={() => setSkillsFormVisible(true)}>
              Editar
            </EditButton>
            <SectionContent>
              {skills.map((skill, index) => (
                <div key={index}>
                  <Paragraph>
                    <strong>Habilidade: </strong>
                    {skill.skill}
                  </Paragraph>
                  <Paragraph>
                    <strong>Tempo de experiência: </strong>
                    {skill.experienceTime}
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
