import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.6rem;

  // make the form smoothly appear on screens transitions
  opacity: 0;
  animation: ${fadeIn} 2s forwards;
`;

export const CustomLink = styled(Link)`
  font-size: 1.6rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.GRAY.hex_747474};
  &:hover {
    color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    text-decoration: underline;
  }
`;
export const FormLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.4rem;
  flex-wrap: wrap;
`;
