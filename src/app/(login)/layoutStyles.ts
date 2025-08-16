import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;

  // swaps the image container position
  &.right {
    & > :first-child {
      transform: translateX(100%);
      transition: transform 1s ease;
    }
    & > :last-child {
      transform: translateX(-100%);
      transition: transform 1s ease;
    }
  }

  & > :first-child,
  & > :last-child {
    width: 50vw;
    transition: transform 1s ease;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  height: 100vh;
`;
export const TextImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.6rem;

  & > img {
    margin-top: auto;
  }
}
`;
export const Title = styled.h1`
  color: white;
  font-size: 4.8rem;
  width: 40rem;
  text-align: center;
  margin-top: 20rem;
}
`;

export const EmployeeImage = styled.div`
  height: 100%;

  background-image: url('/images/login_background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  transition: background-image 0.5s, opacity 2s ease;
  will-change: opacity, background-image;

  opacity: 1;

  filter: brightness(0.5);

  &.candidate {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;
export const CandidateImage = styled.div`
  height: 100%;

  background-image: url('/images/candidate-login-background.png');
  background-position: initial;
  background-repeat: no-repeat;
  background-attachment: fixed;

  transition: background-image 0.5s, opacity 2s ease;
  will-change: opacity, background-image;

  opacity: 1;

  &.employee {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;
