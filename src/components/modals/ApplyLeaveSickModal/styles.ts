import styled from 'styled-components';

export const Form = styled.form`
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 0.4rem;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
`;

export const Message = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  text-align: center;
`;

export const Display = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
export const DigitContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
export const Digit = styled.span`
  font-size: 4.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Button = styled.button`
  font-size: 2.4rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.BLUE.darker};
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  border-radius: 0.4rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.BLUE.dark};
  }
`;

export const SubmitSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const CancelButton = styled.button`
  font-weight: 600;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
    color: ${({ theme }) => theme.colors.WHITE};
  }
`;
export const SaveButton = styled.button`
  font-weight: 600;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  border: none;

  &.saving {
    cursor: progress;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;
