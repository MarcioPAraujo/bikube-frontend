import styled, { keyframes } from 'styled-components';

const jump = keyframes`
  0% { scale: 1; }
  50% { scale: 1.1; }
  100% { scale: 1; }
`;

export const Container = styled.div`
  height: 100dvh;
  width: 100dvw;

  display: grid;
  place-items: center;

  background: linear-gradient(200deg, #f6b31b 0%, #fffbe6 100%);
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  aspect-ratio: 2/3;
  width: 35rem;
  position: relative;

  animation: ${jump} 1s ease-in-out infinite;
`;

export const Title = styled.h1`
  font-size: 4.8rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  text-align: center;
`;

export const Description = styled.p`
  font-size: 1.6rem;
`;

export const Button = styled.button`
  align-self: center;
  height: 3.2rem;
  padding: 0rem 1rem;

  border: none;

  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
  }
`;
