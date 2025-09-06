import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;
