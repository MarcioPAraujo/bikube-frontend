import styled, { css } from 'styled-components';

const Grid = css`
  display: grid;
  column-gap: 0rem;
  row-gap: 1rem;
  height: 2.75rem;
  padding: 0rem 1.6rem 0rem 1.6rem;
`;
export const GridHeader = styled.div`
  ${Grid}
  background-color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;
export const GridHeaderCell = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: 1.6rem;
`;
