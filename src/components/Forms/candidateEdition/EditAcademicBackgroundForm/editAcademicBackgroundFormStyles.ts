import styled from 'styled-components';

export const Form = styled.form`
  position: relative;
  background: ${({ theme }) => theme.colors.WHITE};
  padding: 2rem;
  width: clamp(50rem, 90%, 80rem);

  display: flex;
  flex-direction: column;
  gap: 2rem;

  height: clamp(40rem, 90vh, 55rem);
  overflow-y: auto;
`;
export const Section = styled.section`
  display: flex;
  gap: 3rem;
  flex-direction: column;
`;
export const LanguagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
export const EducationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.35);
  }
`;

export const OptionsWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;
  & > div:first-child {
    display: flex;
    gap: 1rem;
  }
`;

export const EducationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.35);
  }
`;
