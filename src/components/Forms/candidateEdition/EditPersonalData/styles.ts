import styled from 'styled-components';

export const Form = styled.form`
  position: relative;
  background-color: ${({ theme }) => theme.colors.WHITE};
  width: clamp(30rem, 90%, 50rem);
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  & > :last-child,
  & > :nth-child(5) {
    grid-column: span 2;
  }
`;
