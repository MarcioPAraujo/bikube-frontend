import styled from 'styled-components';

export const Form = styled.form`
  position: relative;
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  width: clamp(40rem, 90%, 70rem);
  height: clamp(20rem, 80%, 50rem);
  overflow-y: auto;
`;

export const Description = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_747474};
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  & > :last-child {
    grid-column: span 2;
    justify-self: end;
  }

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin-bottom: 1rem;

  transition: box-shadow 0.3s ease, scale 0.3s ease;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    scale: 1.02;
  }
`;
