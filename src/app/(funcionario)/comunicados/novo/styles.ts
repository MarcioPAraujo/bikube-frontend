import styled from 'styled-components';

export const FieldsWrapper = styled.div`
  display: flex;
  margin: 2rem 0;
  gap: 2rem;
  & > * {
    flex: 1;
  }
`;
export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;

  button {
    width: 12rem;
  }
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;
export const InputLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
`;
export const TextArea = styled.textarea`
  width: 100%;
  height: calc(100vh - 30rem);
  resize: vertical;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  padding: 1rem;

  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    font-weight: 400;
    font-size: 1.6rem;
  }
`;
export const AnnouncementTypeField = styled.div`
  position: relative;
  margin: 1.6rem 0rem;
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;
