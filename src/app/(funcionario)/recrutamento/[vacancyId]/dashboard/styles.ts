import Link from 'next/link';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
`;
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`;
export const Subtitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
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
`;
