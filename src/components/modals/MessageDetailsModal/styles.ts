import styled from 'styled-components';

export const MessagesContainer = styled.div`
  width: clamp(25rem, 80vw, 50rem);
  height: clamp(20rem, 60vh, 40rem);
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_454545};
  font-weight: 700;
`;

export const DateDescription = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  padding: 1rem;
  border-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
`;

export const CloseButton = styled.button`
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  background: none;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  align-self: flex-end;

  transition: all 0.3s ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
    color: ${({ theme }) => theme.colors.RED.hex_EB5757};
    background: ${({ theme }) => theme.colors.RED.hex_FFEBEE};
  }
`;
