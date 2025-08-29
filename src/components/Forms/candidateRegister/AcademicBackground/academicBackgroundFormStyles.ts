import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Content = styled.div`
  align-self: center;
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  width: clamp(30rem, 100%, 70rem);
  gap: 3.6rem;

  padding-bottom: 2.4rem;
`;
export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border: none;
`;

export const Legend = styled.legend`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  margin-bottom: 1.2rem;
`;

export const LanguageWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: self-end;
`;

export const EducationWrapper = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 1fr);
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
export const AddLanguageButton = styled.button`
  width: fit-content;
  height: fit-content;
  background: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  border: none;
  padding: 0.4rem 1rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const RadioOptions = styled.div`
  position: relative;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const RadioErrorMessage = styled.small`
  position: absolute;
  bottom: -1.6rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.RED.hex_EB5757};
`;
