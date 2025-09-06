import { FC } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Checkbox, CheckboxContainer, Container, Label } from './styles';

interface CheckboxProps {
  id: string;
  children: React.ReactNode;
  register?: UseFormRegisterReturn;
  isChecked?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void | (() => void);
}

const CheckboxComponent: FC<CheckboxProps> = ({
  isChecked,
  id,
  children,
  value,
  disabled = false,
  onChange,
  register,
}) => {
  const isDisabled = disabled ? 'disabled' : '';
  return (
    <Container>
      <Label htmlFor={id} className={isDisabled}>
        <CheckboxContainer>
          <FaCheck size={15} color="white" />
          <Checkbox
            type="checkbox"
            name={id}
            id={id}
            value={value}
            disabled={disabled}
            checked={isChecked}
            onChange={onChange}
            {...register}
          />
        </CheckboxContainer>
      </Label>
      {children}
    </Container>
  );
};
export default CheckboxComponent;
