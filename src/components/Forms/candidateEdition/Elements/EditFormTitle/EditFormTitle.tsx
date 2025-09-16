import { Title } from './styles';

interface EditFormTitleProps {
  title: string;
}

const EditFormTitle: React.FC<EditFormTitleProps> = ({ title }) => {
  return <Title>{title}</Title>;
};
export default EditFormTitle;
