import styled from 'styled-components';

export const FlipCard = styled.div`
  background-color: transparent;
  height: 30rem;
  width: clamp(20rem, 100%, 25rem);
  perspective: 1200px;
`;
export const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;

  &:hover {
    transform: rotateY(180deg);
  }
`;

export const Front = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  position: absolute;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

export const Back = styled.div`
  position: absolute;
  background-color: #f0f0f0;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transform: rotateY(180deg);
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1.6rem;
  padding: 2rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  height: 70%;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const Content = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Name = styled.h3`
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.4rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;
export const Description = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};

  span {
    font-weight: 600;
  }
`;
