import styled from 'styled-components';

export const Status = styled.div`
  border: none;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.WHITE};
  font-weight: 600;
  font-size: 1.4rem;
  padding: 0.6rem 1.6rem;
  text-align: center;

  &.approved {
    background-color: ${({ theme }) => theme.colors.GREEN.hex_78C841};
  }

  &.repproved {
    background-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
  }
`;
