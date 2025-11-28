import Link from 'next/link';
import styled from 'styled-components';

export const BottomLinksContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1.6rem;
  justify-content: center;
`;
export const CustomLink = styled(Link)`
  width: fit-content;
  font-weight: 500;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};

  transition: all 0.3s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;
