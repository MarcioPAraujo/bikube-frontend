import styled from 'styled-components';

export const PageTitle = styled.h1`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  font-weight: 700;
  margin-bottom: 2.4rem;
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
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
`;
export const StepsWrapper = styled.div`
  display: flex;
  width: 80rem;
  align-items: center;
  gap: 2.4rem;
  flex-wrap: wrap;
`;
