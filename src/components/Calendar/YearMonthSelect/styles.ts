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
