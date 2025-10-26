import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  &>: first-child {
    margin-left: auto;
    margin-top: 1.6rem;
  }
`;
