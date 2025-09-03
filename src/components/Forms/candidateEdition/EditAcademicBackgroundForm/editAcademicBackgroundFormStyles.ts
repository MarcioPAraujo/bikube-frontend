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

export const AddButton = styled.button`
  width: fit-content;
  background: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  padding: 0.4rem 1rem;
  border: none;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.4rem;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.GRAY.hex_f2f2f2};
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    cursor: not-allowed;
  }
`;

export const RemoveButton = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  background: none;
  border: none;
  border-radius: 50%;

  display: grid;
  place-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.RED.hex_FFEBEE};
    svg path {
      fill: ${({ theme }) => theme.colors.RED.hex_D32F2F};
    }
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
