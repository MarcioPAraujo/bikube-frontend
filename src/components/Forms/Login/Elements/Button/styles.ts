import styled from "styled-components";

export const SubmitButton = styled.button`
    width: 18.2rem;
    height: 3.6rem;
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
    color: ${({ theme }) => theme.colors.YELLOW.hex_F6B31B};
    background-color: ${({ theme }) => theme.colors.GRAY.hex_1b1b1b};
    align-self: center;
    font-size: 1.6rem;
    margin-top: auto;
    margin-bottom: 3.2rem;
    box-shadow: 0px 1px 8px 0px ${({ theme }) => theme.colors.YELLOW.hex_F6B31B} inset;
    &:disabled {
        box-shadow: none;
    }
    transition: all 0.3s ease-in-out;
    &:hover {
        scale: 1.05;
        transition: all 0.3s ease-in-out;
    }
    &:active {
        scale: 0.95;
        transition: all 0.3s ease-in-out;
    }
`;