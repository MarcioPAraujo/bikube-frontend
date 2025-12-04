import Link from 'next/link';
import styled from 'styled-components';

export const MainContainer = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const VacanciesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .swipper-pagination-horizontal {
    bottom: 0 !important;
  }
  .swiper-pagination-bullet-active {
    background-color: ${props =>
      props.theme.colors.YELLOW.hex_F6B31B} !important;
  }
`;

export const H2 = styled.h2`
  width: fit-content;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.GRAY.hex_454545};
`;
export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_454545};

  & > a:hover {
    text-decoration: underline;
  }
`;

export const Messages = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GRAY.hex_454545};
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
export const CardLink = styled(Link)`
  height: 30rem;
  display: block;
  text-decoration: none;
  color: inherit;
`;
