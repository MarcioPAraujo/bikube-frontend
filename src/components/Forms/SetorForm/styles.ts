import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;
export const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1;
`;
export const Form = styled.form`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.colors.WHITE};
  padding: 2rem;
  border-radius: 0.8rem;
  height: 30rem;
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2.2rem;
  }
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  label {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  }
  input {
    padding: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    border-radius: 0.8rem;
    font-size: 1.6rem;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
      font-size: 1.6rem;
    }
  }
`;
export const ErrorMessage = styled.span`
  position: absolute;
  bottom: -1.5rem;
  color: ${({ theme }) => theme.colors.RED.hex_D32F2F};
  font-size: 1.4rem;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: auto;
  gap: 1rem;
`;
