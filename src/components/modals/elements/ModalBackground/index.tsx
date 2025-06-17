import { BlurBackground, Container } from './styles';

interface IProps {
  children: React.ReactNode;
}
const ModalBackground: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <BlurBackground />
      {children}
    </Container>
  );
};
export default ModalBackground;
