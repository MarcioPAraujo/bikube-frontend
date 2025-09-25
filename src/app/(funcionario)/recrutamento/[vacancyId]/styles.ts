import styled from 'styled-components';

export const PageTitle = styled.h1`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  font-weight: 700;
  margin-bottom: 1.2rem;
`;
export const SubtitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.4rem;

  p {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
    font-weight: 500;
  }
`;
