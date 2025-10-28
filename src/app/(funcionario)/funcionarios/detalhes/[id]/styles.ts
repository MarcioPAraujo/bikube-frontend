import styled from 'styled-components';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.RED.hex_EB5757};
  color: ${({ theme }) => theme.colors.WHITE};
  font-weight: 600;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  border: none;
  margin-top: 1rem;

  transition: scale 0.2s ease-in-out;
  &: hover {
    scale: 1.025;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  &: active {
    scale: 0.975;
  }
`;
