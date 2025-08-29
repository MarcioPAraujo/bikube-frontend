import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-bottom: 2.4rem;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  align-self: center;
  width: clamp(60rem, 80%, 90rem);
  margin: auto;

  padding: 4rem;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);

  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.2);
  & > :last-child,
  & > :nth-child(6),
  & > :first-child {
    grid-column: span 2;
  }
`;
