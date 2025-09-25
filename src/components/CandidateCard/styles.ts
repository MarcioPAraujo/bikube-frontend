import styled from 'styled-components';

export const CardContainer = styled.div`
  height: 30rem;
  width: clamp(20rem, 100%, 25rem);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: all 0.2s ease-in-out;
  will-change: transform, box-shadow, scale;
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.35);
    cursor: pointer;
    scale: 1.02;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  height: clamp(20rem, 100%, 25rem);
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
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;
