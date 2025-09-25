'use client';

import VacancyStep from '@/components/VacancyStep/VacancyStep';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Content, StepsWrapper } from './styles';

interface IStep {
  title: string;
  description: string;
  photUrl: string;
  step: 'triagem' | 'entrevista' | 'proposta';
}

const steps: IStep[] = [
  {
    step: 'triagem',
    title: 'Triagem',
    description:
      'Veja todoas os candidados que aplicaram para essa vaga e decida quais você deseja avançar para apróxima etapa do processo.',
    photUrl: '/images/check-photo.jpg',
  },
  {
    step: 'entrevista',
    title: 'Entrevista',
    description:
      'Agende entrevistas com os candidatos selecionados e acompanhe o progresso de cada um.',
    photUrl: '/images/interview.jpg',
  },
  {
    step: 'proposta',
    title: 'Proposta',
    description:
      'Envie propostas para os candidatos aprovados e gerencie as respostas.',
    photUrl: '/images/accepted.jpg',
  },
];

const VacancyStepsPage: React.FC = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();

  const searchParams = useSearchParams();
  const [vacancyName, setVacancyName] = useState<string>('');

  useEffect(() => {
    const name = searchParams.get('nome');
    if (name) {
      setVacancyName(name);
    }
  }, [searchParams]);

  return (
    <Content>
      <StepsWrapper>
        {steps.map(step => (
          <VacancyStep
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            photUrl={step.photUrl}
            detailsLink={`/recrutamento/${vacancyId}/etapas/${step.step}/candidatos?nome=${vacancyName}`}
          />
        ))}
      </StepsWrapper>
    </Content>
  );
};
export default VacancyStepsPage;
