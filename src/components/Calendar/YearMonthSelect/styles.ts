import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  bottom: -40rem;
  height: 40rem;
  width: 32rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  border-radius: 0.8rem;
  padding: 1.6rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 1000;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Backbutton = styled.button`
  border: none;
  background: none;
  border-radius: 50%;
`;
export const SelectsContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 24rem;
  overflow-y: auto;
`;
export const Datebutton = styled.button`
  background-color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  font-size: 1.6rem;
  height: 3.5rem;
  padding: 0rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border-radius: 0.8rem;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
    color: ${({ theme }) => theme.colors.GRAY.hex_353535};
    cursor: not-allowed;
  }
`;
export const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  font-size: 1.6rem;
  padding: 0.8rem;
  cursor: pointer;
  border-radius: 0.8rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
    color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }

  &.selected {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
    color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  }
`;


