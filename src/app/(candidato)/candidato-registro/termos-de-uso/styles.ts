import styled from 'styled-components';

export const Main = styled.main`
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: clamp(30rem, 90%, 100rem);
  margin: 0 auto;

  font-size: 1.6rem;

  & > :last-child {
    padding-bottom: 3rem;
  }
`;

export const CustomLink = styled.button`
  width: fit-content;
  font-weight: 500;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};

  border: none;
  background: none;

  transition: all 0.3s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;

export const Paragraph = styled.p`
  text-align: justify;
  line-height: 2.4rem;
  text-indent: 1.6rem;
`;

export const Ul = styled.ul`
  list-style-type: none;
`;
