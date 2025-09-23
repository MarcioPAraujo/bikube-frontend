import Link from 'next/link';
import styled from 'styled-components';

export const TabList = styled.ul`
  display: flex;
  list-style: none;
`;

export const TabsContainer = styled(Link)`
  height: 3.6rem;
  display: grid;
  place-items: center;
  width: fit-content;
  padding: 0 1rem;

  border-radius: 0.8rem 0.8rem 0 0;

  font-weight: 500;
  font-size: 1.4rem;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  color: ${({ theme }) => theme.colors.WHITE};

  &.selected {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  }
`;
export const Description = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
  font-weight: 400;

  height: 3.6rem;
  padding: 0 1rem;
  display: grid;
  align-items: center;
  border-radius: 0 0.8rem 0.8rem 0.8rem;
`;
