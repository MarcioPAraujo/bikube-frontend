import styled from 'styled-components';

export const Main = styled.main`
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: clamp(30rem, 90%, 100rem);
  margin: 0 auto;

  font-size: 1.6rem;
`;
export const Paragraph = styled.p`
  text-align: justify;
  line-height: 2.4rem;
  text-indent: 1.6rem;
`;
export const Ul = styled.ul`
  list-style-type: none;
  text-align: justify;
  line-height: 2.4rem;
  text-indent: 1.6rem;
`;
export const DefaultUl = styled.ul`
  padding-left: 1.6rem;
  text-align: justify;
  line-height: 2.4rem;
  text-indent: 1.6rem;
`;
