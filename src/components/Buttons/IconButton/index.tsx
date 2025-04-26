import { ElementType } from 'react';
import { Button } from './styles';

interface IconButtonProps {
  icon: ElementType;
  onClick: VoidFunction;
}
const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      <Icon />
    </Button>
  );
};
export default IconButton;
