import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2.4rem;
`;

export const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1.6rem;
  margin-top: 2.4rem;

  & >: nth-child(5),
  & >: nth-child(6) {
    grid-column: span 3;
    min-height: 20rem;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 1.6rem;

  transition: border-color 0.3s;
  &: hover {
    border-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
  }
`;
export const FieldLabel = styled.span`
  font-weight: 600;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;
export const FieldValue = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;
