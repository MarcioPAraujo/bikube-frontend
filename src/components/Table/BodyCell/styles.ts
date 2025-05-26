import styled from 'styled-components';

export const Cell = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 1.6rem;
`;
