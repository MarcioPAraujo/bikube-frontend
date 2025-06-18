import styled from "styled-components";

export const Field = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const Label = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  gap: 0.5rem;
  width: 100%;
`;
export const Content = styled.span`
  cursor: pointer;
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 0.8rem;
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  background-color: ${({ theme }) => theme.colors.WHITE};

  &.placeholder {
    color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
    opacity: 0.5;
  }
`;

