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
  z-index: 100000;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const IconContainer = styled.div`
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.GREEN.hex_4A9782};

  height: 13rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  padding: 1rem;
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_696969};
  text-align: center;
`;
export const Message = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_747474};
  text-align: center;
`;
export const Button = styled.button`
  background: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GREEN.hex_4A9782};
  color: ${({ theme }) => theme.colors.GREEN.hex_4A9782};
  font-weight: 700;
  width: 80%;
  align-self: center;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;
  margin-top: auto;
  margin-bottom: 2rem;
  transition: border-color 0.5s ease, color 0.4s ease,
    background-color 0.7s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.GREEN.hex_78C841};
    color: ${({ theme }) => theme.colors.GREEN.hex_78C841};
    background-color: ${({ theme }) => theme.colors.GREEN.hex_FEFAE0};
  }
`;
