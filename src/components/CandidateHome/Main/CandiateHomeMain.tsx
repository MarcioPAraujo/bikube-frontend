import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Icon } from '@/components/Icons/Icons';
import { useState } from 'react';
import VacancyCard from '@/components/VacancyCard/VacancyCard';
import {
  CustomLink,
  H2,
  MainContainer,
  NotificationButton,
  Subtitle,
  VacanciesSection,
} from './candidateHomeMainStyles';
import MessagesBar from '../MessagesBar/MessagesBar';

interface IVancancyCardProps {
  title: string;
  description: string;
  location: string;
  salary: string;
}

const mockedvacancies: IVancancyCardProps[] = Array.from(
  { length: 20 },
  (_, index) => ({
    title: `Vaga ${index + 1}`,
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore inventore odio, autem suscipit obcaecati voluptates nulla mollitia reiciendis molestiae magni illo perferendis iure impedit nam alias natus culpa tempora ab.',
    location: 'São Paulo, SP',
    salary: 'R$ 3.000,00',
  }),
);

const CandidateHomeMain: React.FC = () => {
  const [openNotifications, setOpenNotifications] = useState(false);
  return (
    <MainContainer>
      <MessagesBar
        isOpen={openNotifications}
        onClose={() => setOpenNotifications(false)}
      />
      <NotificationButton
        type="button"
        onClick={() => setOpenNotifications(true)}
      >
        <Icon name="NotificationOn" size={25} />
      </NotificationButton>
      <div>
        <VacanciesSection>
          <H2>Vagas abertas</H2>
          <Subtitle>
            <CustomLink href="/area-do-candidato/vagas/abertas">
              Veja as vagas que estão abertas para você se candidatar
            </CustomLink>
          </Subtitle>
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            autoplay={{ delay: 4000 }}
            loop
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1230: { slidesPerView: 4 },
              1630: { slidesPerView: 5 },
              1940: { slidesPerView: 6 },
              2560: { slidesPerView: 7 },
            }}
            style={{
              width: 'clamp(760px, 90vw, 2400px)',
              padding: '3rem 0.5rem',
            }}
          >
            {mockedvacancies.map((vacancy, index) => (
              <SwiperSlide key={index}>
                <CustomLink
                  href={`/area-do-candidato/vagas/abertas?id=${index + 1}`}
                >
                  <VacancyCard
                    title={vacancy.title}
                    description={vacancy.description}
                    location={vacancy.location}
                    salary={vacancy.salary}
                  />
                </CustomLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </VacanciesSection>
        <VacanciesSection>
          <H2>Vagas em andamento</H2>
          <Subtitle>
            <CustomLink href="/area-do-candidato/vagas/aplicadas">
              Veja as vagas que você já se candidatou
            </CustomLink>
          </Subtitle>
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            autoplay={{ delay: 4000 }}
            loop
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1230: { slidesPerView: 4 },
              1630: { slidesPerView: 5 },
              1940: { slidesPerView: 6 },
              2560: { slidesPerView: 7 },
            }}
            style={{
              width: 'clamp(760px, 90vw, 2400px)',
              padding: '3rem 0.5rem',
            }}
          >
            {mockedvacancies.map((vacancy, index) => (
              <SwiperSlide key={index}>
                <CustomLink
                  href={`/area-do-candidato/vagas/aplicadas?id=${index + 1}`}
                >
                  <VacancyCard
                    title={vacancy.title}
                    description={vacancy.description}
                    location={vacancy.location}
                    salary={vacancy.salary}
                  />
                </CustomLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </VacanciesSection>
      </div>
    </MainContainer>
  );
};
export default CandidateHomeMain;
