import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import VacancyCard from '@/components/VacancyCard/VacancyCard';
import { useCandidateAuth } from '@/hooks/usecandidateAuth';
import { useQuery } from '@tanstack/react-query';
import {
  getAllVacancies,
  getAppliedVacancies,
} from '@/services/vacancy/vacancyService';
import RenderIf from '@/components/RenderIf/RenderIf';
import {
  CustomLink,
  H2,
  MainContainer,
  Messages,
  Subtitle,
  VacanciesSection,
} from './styles';

const CandidateHomeMain: React.FC = () => {
  const { candidate } = useCandidateAuth();

  const candidateId = candidate ? Number(candidate.id) : 0;

  const {
    data: candidateVacancies,
    isError: isCandidateVacanciesError,
    isPending: isCandidateVacanciesPending,
  } = useQuery({
    queryKey: ['appliedVacancies', candidate?.id],
    queryFn: () => getAppliedVacancies(candidateId),
    enabled: candidateId > 0,
  });

  const {
    data: allVacancies,
    isError: isAllVacanciesError,
    isPending: isAllVacanciesPending,
  } = useQuery({
    queryKey: ['allVacancies'],
    queryFn: () => getAllVacancies(),
  });

  if (isCandidateVacanciesPending || isAllVacanciesPending) return null;
  if (isCandidateVacanciesError || isAllVacanciesError) return null;

  const filteredOpenVacancies = allVacancies?.data?.filter(av => {
    return !candidateVacancies?.data?.some(cv => cv.vaga.id === av.id);
  });

  return (
    <MainContainer>
      <div>
        <VacanciesSection>
          <H2>Vagas abertas</H2>
          <Subtitle>
            <CustomLink href="/area-do-candidato/vagas/abertas">
              Veja as vagas que estão abertas para você se candidatar
            </CustomLink>
          </Subtitle>
          <RenderIf isTrue={filteredOpenVacancies?.length !== 0}>
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
              {filteredOpenVacancies?.map((vacancy, index) => (
                <SwiperSlide key={index}>
                  <CustomLink
                    href={`/area-do-candidato/vagas/abertas?id=${vacancy.id}`}
                  >
                    <VacancyCard
                      title={vacancy.titulo}
                      description={vacancy.descricao}
                      location={vacancy.localizacao}
                      contractType={vacancy.tipoContrato}
                    />
                  </CustomLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </RenderIf>
          <RenderIf isTrue={filteredOpenVacancies?.length === 0}>
            <Messages>Não há novas vagas abertas no momento.</Messages>
          </RenderIf>
        </VacanciesSection>
        <VacanciesSection>
          <H2>Vagas em andamento</H2>
          <Subtitle>
            <CustomLink href="/area-do-candidato/vagas/aplicadas">
              Veja as vagas que você já se candidatou
            </CustomLink>
          </Subtitle>
          <RenderIf isTrue={candidateVacancies?.data?.length !== 0}>
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
              {candidateVacancies?.data?.map((vacancy, index) => (
                <SwiperSlide key={index}>
                  <CustomLink
                    href={`/area-do-candidato/vagas/aplicadas?id=${vacancy.vaga.id}`}
                  >
                    <VacancyCard
                      title={vacancy.vaga.titulo}
                      description={vacancy.vaga.descricao}
                      location={vacancy.vaga.localizacao}
                      contractType={vacancy.vaga.tipoContrato}
                    />
                  </CustomLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </RenderIf>
          <RenderIf isTrue={candidateVacancies?.data?.length === 0}>
            <Messages>Você ainda não se candidatou a nenhuma vaga.</Messages>
          </RenderIf>
        </VacanciesSection>
      </div>
    </MainContainer>
  );
};
export default CandidateHomeMain;
