import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-self: center;
  width: clamp(30rem, 80%, 60rem);
  margin: auto;

  padding: 4rem;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);

  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.2);
`;

export const Description = styled.p`
  font-size: 1.6rem;
`;

export const ResedCodeButton = styled.button`
  width: 20rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  font-size: 1.4rem;
  font-weight: 500;

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.GRAY.hex_696969};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_696969};
  }
`;
