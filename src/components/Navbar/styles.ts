import styled from "styled-components";

export const NavbarStyled = styled.nav`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 41.3rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  border-radius: 0rem 0.8rem 0.8rem 0rem;
  border: 1rem solid ${({ theme }) => theme.colors.GRAY.hex_353535};

  transition: transform 0.3s ease-in-out;
  transform: translateX(0);
  &.close {
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
  }
`;
export const OpenCloseButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -4rem;
  width: 4rem;
  height: 6rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  border-top: 1rem solid ${({ theme }) => theme.colors.GRAY.hex_353535};
  border-bottom: 1rem solid ${({ theme }) => theme.colors.GRAY.hex_353535};
  border-left: none;
  border-right: 1rem solid ${({ theme }) => theme.colors.GRAY.hex_353535};
  border-radius: 0% 50% 50% 0%;
  display: flex;
  align-items: center;
  justify-content: center;


  &.close svg {
    transform: rotate(0deg);
  }
  &.open svg {
    transform: rotate(180deg);
  }
`;
