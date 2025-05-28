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
export const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 1rem;
  border-radius: 0.8rem;
  z-index: 100000;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  height: 30rem;
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;
export const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.RED.normal};
  text-align: center;
`;
export const Message = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  text-align: center;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;
export const Button = styled.button`
  background: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.RED.normal};
  color: ${({ theme }) => theme.colors.RED.normal};
  font-weight: 700;
  width: 80%;
  align-self: center;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;
  margin-top: auto;
  margin-bottom: 2rem;
  transition: background-color 0.3s;

  &.filled {
    background: ${({ theme }) => theme.colors.RED.normal};
    color: ${({ theme }) => theme.colors.WHITE};
    border: 1px solid ${({ theme }) => theme.colors.RED.normal};
  }
`;
