import { Icons } from '@/components/Icons/Icons';
import { Button } from './removeButtonStyles';

interface RemoveButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button type="button" onClick={onClick} disabled={disabled}>
      <Icons.Trash size={20} color="#747474" />
    </Button>
  );
};
export default RemoveButton;
