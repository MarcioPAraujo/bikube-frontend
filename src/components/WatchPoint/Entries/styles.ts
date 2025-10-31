import styled from 'styled-components';

export const EntriesContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
export const Title = styled.h2`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  font-weight: 600;
`;
export const BoxEntries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.6rem;

  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
`;

export const EntryRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
export const Description = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  font-weight: 500;
  text-transform: Capitalize;
`;
export const Time = styled.span`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  font-weight: 600;

  border-bottom: 1px dashed ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};
`;
