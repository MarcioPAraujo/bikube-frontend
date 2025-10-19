import styled from 'styled-components';

export const FormModal = styled.form`
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: 60rem;

  position: relative;
  z-index: 1;
`;

export const PointsWrapper = styled.div`
  display: flex;
  gap: 4rem;
`;

export const PointGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  .keep {
    background-color: ${({ theme }) => theme.colors.GREEN.hex_A3DC9A};
  }

  .change {
    background-color: ${({ theme }) => theme.colors.RED.hex_FFB4B4};
  }
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
`;
