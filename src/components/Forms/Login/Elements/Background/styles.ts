import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.9);
`;
export const LoginBackground = styled.form`
    width: 41.3rem;
    height: 54.3rem;
    background-color: ${({ theme }) => theme.colors.GRAY.hex_353535};
    border-radius: 1.6rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;