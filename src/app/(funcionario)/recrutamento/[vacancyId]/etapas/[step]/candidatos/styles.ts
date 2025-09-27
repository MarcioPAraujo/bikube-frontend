import Link from 'next/link';
import styled from 'styled-components';

export const Subtitle = styled.h2`
  font-weight: 600;
  margin-bottom: 1.6rem;
`;

export const CardsContainer = styled.div`
  display: flex;
  width: 100%
  align-items: center;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2.5rem;
`;
export const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  height: 30rem;
  width: clamp(20rem, 100%, 25rem);
`;
