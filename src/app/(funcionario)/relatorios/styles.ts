import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;
export const FiltersContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;

  & > :first-child,
  & > :nth-child(2) {
    width: 20rem;
  }
`;
