import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 2rem;
`;
export const Title = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 1rem;
`;

export const SectionsContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
`;
export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};
  font-size: 2.4rem;
  margin-bottom: 1rem;
`;
export const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.GRAY.hex_454545};
  border: none;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 0.5rem 1.5rem;
`;
export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  &.academic {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5rem;
  }
`;
export const Subtitle = styled.h3`
  font-size: 1.8rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};
`;
export const Paragraph = styled.p`
  font-size: 1.4rem;
  margin: 0.5rem 0rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  strong {
    font-weight: 700;
  }
`;
