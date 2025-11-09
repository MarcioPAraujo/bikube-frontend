import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  & > :first-child,
  & > :last-child {
    flex: 1;
  }
`;

export const SituationStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
export const ActionButton = styled.button`
  display: inline-block;
  width: fit-content;
  padding: 0.6rem 1rem;
  font-size: 1.4rem;
  font-weight: 600;
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

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
  color: ${({ theme }) => theme.colors.WHITE};
  font-weight: 600;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  border: none;
  margin-top: 1rem;

  transition: scale 0.2s ease-in-out;
  &: hover {
    scale: 1.025;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  &: active {
    scale: 0.975;
  }
`;
