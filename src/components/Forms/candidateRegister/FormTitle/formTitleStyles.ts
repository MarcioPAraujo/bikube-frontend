import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const Button = styled.button`
  font-size: 1.6rem;
  width: clamp(10rem, 15rem, 20rem);
  height: 3.6rem;

  border: none;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.WHITE};
  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.GRAY.hex_919191};

  transition: background-color 0.3s ease-in-out;

  &.back:hover {
    background-color: ${({ theme }) => theme.colors.RED.hex_D32F2F};
  }
  &.next:hover {
    background-color: ${({ theme }) => theme.colors.GREEN.hex_78C841};
  }
`;
