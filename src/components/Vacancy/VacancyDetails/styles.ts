import styled from 'styled-components';

export const EmptyStateContainer = styled.div`
  flex: 1;
  display: grid;
  place-items: center;

  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_696969};

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 3.2rem 0rem;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
  }
`;
export const StepPhase = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  p {
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
    font-size: 1.4rem;
    background-color: ${({ theme }) => theme.colors.GRAY.hex_A2A2A2};
    border-radius: 0.8rem 0rem 0rem 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  span {
    text-transform: uppercase;
    font-size: 1.4rem;
    background-color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 0rem 0.8rem 0.8rem 0rem;
    font-weight: 600;
  }
`;

export const VancancyName = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
`;
export const Details = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  font-size: 1.4rem;
`;
export const ApplyButton = styled.button`
  padding: 1.2rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_454545};
  color: white;
  border: none;

  width: fit-content;
  align-self: flex-end;

  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.05;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    scale: 0.95;
    box-shadow: none;
  }
`;
