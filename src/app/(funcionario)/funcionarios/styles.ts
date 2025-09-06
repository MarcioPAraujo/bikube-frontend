import Link from 'next/link';
import styled from 'styled-components';

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* Mantém a cor do texto original */
`;

export const TopTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
