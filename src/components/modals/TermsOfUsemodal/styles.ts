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
  z-index: 99999;
`;
export const Form = styled.form`
  position: relative;
  background: white;
  padding: 1rem;
  border-radius: 0.8rem;
  z-index: 100000;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  height: 60rem;
  width: 90rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.BLACK};
  text-align: center;
  font-weight: 700;
`;
export const TextContainer = styled.div`
  width: 100%;
  height: 45rem;
`;
export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.BLACK};
  resize: none;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;
