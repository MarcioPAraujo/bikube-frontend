import Link from 'next/link';
import styled from 'styled-components';

export const Form = styled.form`
  width: clamp(20rem, 80%, 35rem);
  height: 40rem;
  border-radius: 1rem;
  background-color: white;

  border: solid 1px ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};

  margin: auto;
  padding: 1rem 1.6rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Title = styled.h2`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_747474};
  text-align: center;
`;

export const Description = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  text-align: center;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.GRAY.hex_353535};
  width: fit-content;

  font-size: 1.4rem;

  transition: scale 0.2s ease-in-out;
  &:hover {
    scale: 1.025;

    color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
  }
`;

export const SubmitButton = styled.button`
  margin-top: auto;
  width: fit-content;

  align-self: center;
  padding: 0.5rem 2rem;

  border: none;
  border-radius: 0.7rem;
  background-color: ${({ theme }) => theme.colors.YELLOW.hex_FFB936};

  font-size: 1.6rem;
  font-weight: 500;

  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    cursor: default;
    box-shadow: none;
  }
`;

export const CodeResntButton = styled.button`
  border: none;
  background: none;
  width: fit-content;

  text-decoration: underline;

  color: ${({ theme }) => theme.colors.YELLOW.hex_9E4A00};

  transition: color 0.5s ease;
  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 1;
    color: ${({ theme }) => theme.colors.GRAY.hex_d7d7d7};
    text-decoration: none;

    cursor: not-allowed;
  }
`;
