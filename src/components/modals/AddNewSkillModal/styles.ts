import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  background-color: #ffffff;
  padding: 2.4rem;
  width: clamp(32rem, 90vw, 40rem);
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;
