import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Input, Label } from './styles';

interface CheckboxProps {
  id: string;
  label: string;
  value: string;
  register?: UseFormRegisterReturn;
}

const RadioInput: FC<CheckboxProps> = ({ value, id, label, register }) => {
  return (
    <Label htmlFor={id}>
      <Input type="radio" id={id} value={value} {...register} />
      <span>{label}</span>
    </Label>
  );
};
export default RadioInput;
