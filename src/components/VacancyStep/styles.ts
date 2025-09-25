import styled, { keyframes } from 'styled-components';

const appearfromLeft = (from: string, to: string) => keyframes`
  from {
    opacity: 0;
    transform: translateX(${from});
  }
  to {
    opacity: 1;
    transform: translateX(${to});
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: clamp(15rem, 100%, 25rem);
  height: 40rem;
  position: relative;

  &.triagem {
    animation: ${appearfromLeft('-10rem', '0')} 0.6s ease-in-out;
  }
  &.entrevista {
    animation: ${appearfromLeft('0', '0')} 0.6s ease-in-out;
  }
  &.proposta {
    animation: ${appearfromLeft('10rem', '0')} 0.6s ease-in-out;
  }
`;
export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
`;
export const Photo = styled.div`
  height: 36rem;
  background-size: cover;
  background-position: center;
  border-radius: 0.8rem;
  position: relative;

  transition: box-shadow 0.3s ease-in-out, scale 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    scale: 1.02;
  }

  &.triagem {
    background-position: 85% 20%;
  }
`;

export const Description = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.colors.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.6rem;
  padding: 1.6rem;
  font-weight: 500;

  &:hover {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    border-radius: 0.8rem;
  }
`;
