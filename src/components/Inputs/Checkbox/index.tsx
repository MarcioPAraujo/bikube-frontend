import { FC } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { Checkbox, CheckboxContainer, Container, Label } from './styles';

interface CheckboxProps {
  id: string;
  children: React.ReactNode;
  isChecked: boolean;
  disabled?: boolean;
  value?: string;
  onChange: () => void;
}

const CheckboxComponent: FC<CheckboxProps> = ({ isChecked, id, children, value, disabled = false, onChange }) => {
  const classname = isChecked ? 'checked' : '';
  const isDisabled = disabled ? 'disabled' : '';
  return (
    <Container>
      <Label htmlFor={id} className={`${classname} ${isDisabled}`}>
        <CheckboxContainer>
          <FaCheck size={15} color="white" className={classname} />
          <Checkbox
            type="checkbox"
            name={id}
            id={id}
            value={value}
            disabled={disabled}
            checked={isChecked}
            onChange={onChange}
          />
        </CheckboxContainer>
      </Label>
      {children}
    </Container>
  );
};
export default CheckboxComponent;
