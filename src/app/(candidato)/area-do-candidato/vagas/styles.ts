import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  padding: 3.2rem;
  & > :first-child {
    flex: 1;
  }
`;

export const VerticalDivider = styled.span`
  width: 1px;
  background-color: #ccc;
  margin: 0 2.4rem;
`;
