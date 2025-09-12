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
  z-index: 1;
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

export const ModalWrapper = styled.div`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.colors.WHITE};
  padding: 1rem;
  border-radius: 0.8rem;
  height: 20rem;
  width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
`;
export const Message = styled.p`
  font-size: 1.6rem;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  height: 3rem;
  cursor: pointer;
  border: solid 1px ${({ theme }) => theme.colors.GREEN.hex_018D1F};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.WHITE};
  color: ${({ theme }) => theme.colors.GREEN.hex_018D1F};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREEN.hex_018D1F};
    color: ${({ theme }) => theme.colors.WHITE};
  }

  &.not-logged-in {
    border-color: ${({ theme }) => theme.colors.RED.hex_D32F2F};
    color: ${({ theme }) => theme.colors.RED.hex_D32F2F};

    &:hover {
      background-color: ${({ theme }) => theme.colors.RED.hex_D32F2F};
      color: ${({ theme }) => theme.colors.WHITE};
    }
  }
`;
