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
  justify-content: space-between;
  gap: 2rem;
`;

export const IconContainer = styled.div`
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};

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
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;
export const Button = styled.button`
  background: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
  color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
  font-weight: 700;
  width: 80%;
  align-self: center;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;
  margin-top: auto;
  margin-bottom: 2rem;

  height: 4.2rem;

  &.filled {
    background: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    color: ${({ theme }) => theme.colors.WHITE};
    border: 1px solid ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
  }

  transition: font-size 0.3s ease-in-out;
  &:hover {
    font-size: 1.7rem;
  }
`;
