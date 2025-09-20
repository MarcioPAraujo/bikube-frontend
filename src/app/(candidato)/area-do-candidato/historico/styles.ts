import styled from 'styled-components';

export const Page = styled.div`
  margin: 0 auto;
`;

export const TitleSection = styled.div`
  position: sticky;
  z-index: 999;
  top: 0;
  background: white;
  height: 8rem;
  padding: 0 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3.2rem;

  h1 {
    font-size: 3.2rem;
    color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  }

  p {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.GRAY.hex_747474};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 4rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.GRAY.hex_747474};
  font-size: 1.6rem;
  margin-top: 2rem;
`;
