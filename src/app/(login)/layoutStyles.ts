import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;

  & > :first-child,
  & > :last-child {
    flex: 1;
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

export const BackgroundImage = styled.div`
  height: 100%;

  background-image: url('/images/login_background.png');
  background-position: center right;
  background-repeat: no-repeat;
  background-attachment: fixed;

  filter: brightness(0.5);
`;
