import { FC } from 'react';
import { Input, Label } from './styles';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxProps {
  id: string;
  label: string;
  radioname: string;
  isChecked: boolean;
  onChange: VoidFunction;
}

const RadioInput: FC<CheckboxProps> = ({ isChecked, radioname, id, label, onChange }) => {
  const classname = isChecked ? 'checked' : '';
  return (
    <Label htmlFor={id} className={`${classname}`}>
      <Input type="radio" name={radioname} id={id} checked={isChecked} onChange={onChange} />
      <span>{label}</span>
    </Label>
  );
};
export default RadioInput;
