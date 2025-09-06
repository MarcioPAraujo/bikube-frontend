import styled, { keyframes } from 'styled-components';

const pumpping = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  img {
    animation: ${pumpping} 2s linear infinite;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
`;
export const LoadingText = styled.p`
  font-size: 2rem;
  color: #333;
  font-weight: 500;
  animation: ${fadeIn} 2s ease-in-out infinite;
  animation-delay: 0.5s;
`;
