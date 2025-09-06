import { ElementType } from 'react';
import { Button } from './styles';

interface IconButtonProps {
  icon?: ElementType;
  onClick: VoidFunction;
  iconNode?: React.ReactNode;
}
const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  iconNode,
}) => {
  if (iconNode) {
    return (
      <Button type="button" onClick={onClick}>
        {iconNode}
      </Button>
    );
  }

  if (!Icon) return null;

  return (
    <Button type="button" onClick={onClick}>
      <Icon />
    </Button>
  );
};
export default IconButton;
