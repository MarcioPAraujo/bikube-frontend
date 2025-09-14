'use client';

import VacancyCard from '@/components/VacancyCard/VacancyCard';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useState } from 'react';
import IconButton from '@/components/Buttons/IconButton';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/Icons/Icons';
import { ButtonsContainer, CardsContainer, Page, TitleSection } from './styles';

interface IVancancyCardProps {
  title: string;
  description: string;
  location: string;
  constractType: string;
}

enum Routes {
  HOME = '/area-do-candidato/inicio',
}

const mockedvacancies: IVancancyCardProps[] = Array.from(
  { length: 20 },
  (_, index) => ({
    title: `Vaga ${index + 1}`,
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore inventore odio, autem suscipit obcaecati voluptates nulla mollitia reiciendis molestiae magni illo perferendis iure impedit nam alias natus culpa tempora ab.',
    location: 'São Paulo, SP',
    constractType: 'PJ',
  }),
);
const HistoryPage: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  return (
    <Page>
      <TitleSection>
        <ButtonsContainer>
          <IconButton
            onClick={() => router.push(Routes.HOME)}
            iconNode={<Icon name="Home" />}
          />
          <div>
            <h1>Histórico</h1>
            <p>Veja as vagas que você se candidatou</p>
          </div>
        </ButtonsContainer>
        <SearchBarComponent
          value={search}
          placeholder="Pesquisar vaga"
          onSearch={e => setSearch(e.target.value)}
        />
      </TitleSection>
      <CardsContainer>
        {mockedvacancies.map((vacancy, index) => (
          <VacancyCard
            key={index}
            title={vacancy.title}
            description={vacancy.description}
            location={vacancy.location}
            contractType={vacancy.constractType}
          />
        ))}
      </CardsContainer>
    </Page>
  );
};
export default HistoryPage;
