import styled from 'styled-components';

export const Container = styled.dialog`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  top: 0;
  left: 0;
  background: transparent;
`;
export const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 0;
`;
export const Bar = styled.div`
  position: relative;
  width: clamp(20rem, 80vw, 30rem);
  background-color: ${({ theme }) => theme.colors.WHITE};
  height: 100%;
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const DateMessage = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.GRAY.hex_353535};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
`;
export const Content = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
export const MessageWrapper = styled.div`
  min-width: 1rem;
  max-width: 50rem;
  border-left: 2px solid ${props => props.theme.colors.YELLOW.hex_F6B31B};
  padding-left: 0.5rem;

  p {
    min-width: 1rem;
    max-width: 50rem;
    font-size: 1.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;
export const MessageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  display: grid;
  place-items: center;

  svg {
    transition: fill 0.3s ease;
  }
  &:hover {
    svg {
      fill: ${props => props.theme.colors.YELLOW.hex_F6B31B};
    }
  }
`;
