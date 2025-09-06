import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  padding: 0rem 3.2rem;
  & > :first-child {
    flex: 1;
  }
`;
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  background: none;
  border: none;
`;

export const VerticalDivider = styled.span`
  width: 1px;
  background-color: #ccc;
  margin: 0 2.4rem;
`;
