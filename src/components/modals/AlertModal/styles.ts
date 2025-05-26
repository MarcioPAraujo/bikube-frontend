import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
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
  width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;

  svg g {
    fill: ${({ theme }) => theme.colors.RED.normal};
  }
`;
export const Message = styled.p`
  text-align: center;
  font-size: 1.6rem;
`;
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ theme }) => theme.colors.RED.normal};
  border-radius: 0.8rem;
  width: 80%;
  height: 4.5rem;
  font-size: 1.6rem;
`;
