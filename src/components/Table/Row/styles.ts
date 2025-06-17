import styled, { css } from 'styled-components';

const Grid = css`
  display: grid;
  column-gap: 0rem;
  row-gap: 1rem;
  height: 3.75rem;
  padding: 0rem 1.6rem 0rem 1.6rem;
`;
export const Row = styled.div`
  ${Grid}
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  }
`;
