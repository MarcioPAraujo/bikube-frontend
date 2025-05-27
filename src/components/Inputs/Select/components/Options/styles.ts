import styled from 'styled-components';

export const Options = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 0px 0px 8px 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
`;
export const OptionsContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: none;
  background-color: transparent;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  }
`;

export const OptionLabel = styled.label`
  font-size: 1.6rem;
  display: block;
  color: ${({ theme }) => theme.colors.BLACK};
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    transition: background-color 0.3s ease-in-out;
    color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
    background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
    border-radius: 0.4rem;
  }
  &.selected {
    color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  }
`;

export const RadioInput = styled.input`
  display: none;
`;
