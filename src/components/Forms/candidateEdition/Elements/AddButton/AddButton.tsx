import { Button } from './addButtonStyles';

interface AddButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}
const AddButton: React.FC<AddButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <Button type="button" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};
export default AddButton;
