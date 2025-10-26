import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2.4rem;
  margin-top: 1.6rem;

  & > div {
    grid-column: span 2;
  }
  & > :nth-child(7),
  & > :last-child {
    grid-column: span 3;
  }
`;
export const KeyWordsWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.6rem;
  height: fit-content;
`;
export const KeyWordsInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
export const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
  display: flex;
  align-items: center;
  gap: 0.4rem;

  abbr {
    width: 1.4rem;
    height: 1.4rem;
  }
`;
export const Input = styled.input`
  width: clamp(20rem, 100%, 30rem);
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY.hex_919191};
  }
  &:focus {
    outline: none;
  }
`;
export const KeywordsBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_f2f2f2};
  margin-top: 2.7rem;
  flex: 1;

  p {
    color: ${({ theme }) => theme.colors.RED.hex_EB5757};
  }
`;
export const KeyWords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;
export const KeyWordItem = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_747474};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;

  border: none;
  font-size: 1.4rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
  }
`;

export const AddButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  color: white;
  font-size: 1.4rem;
  padding: 0.8rem 1.6rem;

  margin-top: 1.6rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;
export const DragSection = styled.div`
  display: flex;
  gap: 0.8rem;

  & > :first-child,
  & > :last-child {
    flex: 1;
  }
`;
export const DragBox = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  border-radius: 0.8rem;
  padding: 2.4rem;
  position: relative;

  abbr {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`;
export const DragItem = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 4px;
  cursor: move;
  background-color: ${({ theme }) => theme.colors.WHITE};
  font-size: 1.4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
