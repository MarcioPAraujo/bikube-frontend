import styled from 'styled-components';

export const Modal = styled.div`
  width: 40rem;
  max-height: 40rem;
  background: ${({ theme }) => theme.colors.WHITE};
  border-radius: 0.8rem;
  padding: 2.4rem 1rem 2.4rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  z-index: 2;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  max-height: 50rem;
  overflow-y: auto;
  padding-right: 1rem;
`;
export const Subject = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.6rem;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.6rem;
`;
