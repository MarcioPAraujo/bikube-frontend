import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  padding: 1.6rem 3.2rem;
  display: flex;
`;
export const TopicsWrapper = styled.div`
  display: flex;
  gap: 6.4rem;
  margin-left: 6.4rem;
  flex-wrap: wrap;
  justify-content: start;
  width: 100%;
`;

export const Topic = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.WHITE};
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    color: ${({ theme }) => theme.colors.GRAY.hex_747474};
    font-size: 1.2em;
    margin-bottom: 0.8rem;
  }
  a {
    color: ${({ theme }) => theme.colors.GRAY.hex_747474};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
