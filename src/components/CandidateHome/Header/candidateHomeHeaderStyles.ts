import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 3.2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

export const ButtonProfile = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  font-size: 1.6rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;
