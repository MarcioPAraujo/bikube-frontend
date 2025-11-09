import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  margin-bottom: 2.4rem;
`;

export const SituationStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SituationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  padding: 1rem;

  transition: box-shadow 0.2s ease-in-out, scale 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    scale: 1.1;
  }
`;

export const SituationBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
`;

export const ValueBadge = styled.span`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.WHITE};
  font-weight: 700;
  align-self: center;
`;
