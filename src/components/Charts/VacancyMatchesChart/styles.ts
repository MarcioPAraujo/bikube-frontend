import styled from 'styled-components';

export const ChartWrapper = styled.div`
  display: grid;
  place-items: center;
  width: clamp(30rem, 40%, 60rem);

  h3 {
    font-size: 1.6rem;
    font-weight: 600;
    width: fit-content;
  }

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;

  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const ChartContainer = styled.div`
  width: clamp(30rem, 100%, 60rem);
  aspect-ratio: 1/1;
`;
