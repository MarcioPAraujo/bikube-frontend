import { FC } from 'react';
import { Input, Label } from './styles';
import { UseFormRegisterReturn } from 'react-hook-form';

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
