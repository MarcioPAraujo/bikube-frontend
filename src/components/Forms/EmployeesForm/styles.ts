import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
`;
export const Fieldset = styled.fieldset`
  border: none;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  padding: 2rem;
  background-color: transparent;
`;
export const Legend = styled.legend`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.BLACK};
  margin-bottom: 1rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;

  .complement,
  .name {
    grid-column: span 2;
  }
`;
