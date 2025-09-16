import styled from 'styled-components';

export const Paragraph = styled.p`
  position: absolute;

  font-size: 1.2rem;
  bottom: -1.5rem;

  color: ${({ theme }) => theme.colors.GRAY.hex_353535};

  &.ERROR-MESSAGE {
    color: ${({ theme }) => theme.colors.RED.hex_D32F2F};
  }
`;
