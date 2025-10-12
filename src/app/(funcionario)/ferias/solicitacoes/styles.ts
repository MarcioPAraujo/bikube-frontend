import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-top: 2.4rem;

  & > :last-child {
    min-width: 20rem;
  }
`;

export const SectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  & > button {
    border: none;
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
    color: ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};
    font-weight: 600;
    font-size: 1.4rem;
    padding: 0.6rem 1.6rem;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.WHITE};
  font-weight: 600;
  font-size: 1.4rem;
  padding: 0.6rem 1.6rem;
  text-align: center;
`;
export const Container = styled.div`
  display: flex;
  gap: 0.8rem;
`;
export const ApproveButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.GREEN.hex_78C841};
`;
export const RejectButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
`;
