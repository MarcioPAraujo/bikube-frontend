import styled from 'styled-components';

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2.4rem;

  & > :first-child {
    max-width: 40rem;
  }
`;
export const Message = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;
