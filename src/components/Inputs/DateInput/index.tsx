import { format } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';
import { Content, Field, Label } from './styles';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Icons } from '@/components/Icons/Icons';
import CalendarInput from '@/components/Calendar/InputCalendar';

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
  const value = date ? format(date, 'dd/MM/yyyy') : '';
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
          onClick={() => {
            setShowDatePicker(true);
            console.log('Date input clicked');
          }}
          {...register}
          hidden
        />
        <CalendarInput date={date} setDate={setDate} />
      </Label>
    </Field>
  );
};
export default DateInput;
