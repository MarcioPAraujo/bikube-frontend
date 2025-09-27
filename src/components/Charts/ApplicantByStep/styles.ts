import styled from 'styled-components';

export const ChartTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  width: fit-content;
`;

export const ChartContainer = styled.div`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;

  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const ChartInner = styled.div`
  height: clamp(25rem, 40vh, 45rem);
`;
