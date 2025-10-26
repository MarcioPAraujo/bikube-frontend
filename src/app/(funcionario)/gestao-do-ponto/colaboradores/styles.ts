import styled from 'styled-components';

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2.4rem;

  & > :first-child {
    max-width: 40rem;
  }
`;
export const ContentWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;
export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 4rem;
  width: 100%;
`;
export const Sidebar = styled.aside`
  position: relative;
  opacity: 0;
  width: 0;
  height: 0;
  overflow: hidden;

  transition: all 0.3s ease-in-out;
  &.selected {
    width: 50rem;
    opacity: 1;
    height: auto;
    overflow: visible;
  }
`;
export const Message = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;
