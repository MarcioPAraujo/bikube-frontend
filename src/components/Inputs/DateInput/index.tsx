import { format } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';
import { Content, Field, Label } from './styles';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Icons } from '@/components/Icons/Icons';

interface DateInputProps {
  id: string;
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  label: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: string;
}
const DateInput: React.FC<DateInputProps> = ({ date, label, setDate, placeholder, id, error, register }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const value = date ? format(date, 'dd/MM/yyyy') : undefined;
  return (
    <Field>
      <Label htmlFor={id}>
        {label}
        <Content className={value ? 'filled' : 'placeholder'}>
          {value ? value : placeholder} <Icons.Calendar />
        </Content>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onClick={() => {
            setShowDatePicker(true);
            console.log('Date input clicked');
          }}
          {...register}
          hidden
        />
      </Label>
    </Field>
  );
};
export default DateInput;
