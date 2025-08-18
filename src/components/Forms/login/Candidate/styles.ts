import Link from 'next/link';
import styled from 'styled-components';

export const Form = styled.form`
  width: clamp(20rem, 80%, 35rem);
  height: 40rem;
  background-color: white;

  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.3);

  margin: auto;
  padding: 1rem 1.6rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Title = styled.h2`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_747474};
`;

export const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.colors.GRAY.hex_999999};
  width: fit-content;

  font-size: 1.4rem;

  transition: scale 0.2s ease-in-out;
  &:hover {
    scale: 1.025;

    color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;

export const Description = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  text-align: center;
`;

export const SubmitButton = styled.button`
  margin-top: auto;
  width: fit-content;

  align-self: center;
  padding: 0.75rem 2rem;

  border: none;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};

  font-size: 1.6rem;
  font-weight: 500;
  color: white;

  &:disabled {
    cursor: default;
  }
`;
