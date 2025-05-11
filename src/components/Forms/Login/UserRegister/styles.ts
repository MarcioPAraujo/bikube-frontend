import styled from "styled-components";

export const CustomLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  font-size: 1.6rem;
`;
