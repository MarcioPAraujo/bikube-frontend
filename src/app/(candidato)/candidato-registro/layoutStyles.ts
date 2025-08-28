import styled from 'styled-components';

export const Main = styled.main`
  padding: 1.6rem;
  height: 100dvh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProgressbarContainer = styled.div`
  position: relative;

  width: clamp(30rem, 100%, 60rem);

  height: 1.8rem;

  background-color: ${({ theme }) => theme.colors.GRAY.hex_454545};
  border-radius: 1rem;
`;

export const BarContent = styled.span`
  position: absolute;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  border-radius: 1rem;

  transition: width 0.3s ease-in-out;

  &.step-1 {
    width: 20%;
  }
  &.step-2 {
    width: 40%;
  }
  &.step-3 {
    width: 60%;
  }
  &.step-4 {
    width: 80%;
  }
  &.step-5 {
    width: 100%;
  }
`;

export const ChildenWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 12rem);
`;
