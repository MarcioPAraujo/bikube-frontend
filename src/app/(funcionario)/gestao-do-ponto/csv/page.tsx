'use client';

import { useAuth } from '@/hooks/useAuth';
import { IOption } from '@/interfaces/option';
import { generatePaySlipCsv } from '@/services/paySlip/paySlipService';
import { notifyError } from '@/utils/handleToast';
import { format } from 'date-fns';
import { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import SelectComponent from '@/components/Inputs/Select/Select';
import {
  DownloadButton,
  Field,
  FilterButton,
  FiltersContainer,
  Header,
  Input,
  Label,
} from './styles';

const monthsOptions: IOption[] = [
  { label: 'Janeiro', value: '1' },
  { label: 'Fevereiro', value: '2' },
  { label: 'Março', value: '3' },
  { label: 'Abril', value: '4' },
  { label: 'Maio', value: '5' },
  { label: 'Junho', value: '6' },
  { label: 'Julho', value: '7' },
  { label: 'Agosto', value: '8' },
  { label: 'Setembro', value: '9' },
  { label: 'Outubro', value: '10' },
  { label: 'Novembro', value: '11' },
  { label: 'Dezembro', value: '12' },
];

const CSVPage = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState<IOption>({} as IOption);
  const [year, setYear] = useState<string>('');

  const handleGenereateCsv = async () => {
    if (user?.role === 'FUNCIONARIO') return;

    if (!selectedMonth || !year) return;

    const month = parseInt(selectedMonth.value, 10) - 1;
    const date = new Date(parseInt(year, 10), month, 1);

    const dateStr = format(date, 'yyyy-MM-dd');

    const response = await generatePaySlipCsv(dateStr);

    if (response.error) {
      notifyError(response.error);
      return;
    }
    if (!response.data) {
      notifyError('Nenhum dado recebido para o CSV.');
      return;
    }

    const url = response.data;

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'espelho.zip'); // Set the file name

    // Append to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleYearChange = (value: string) => {
    // Allow only numbers
    const numericValue = value.replace(/\D/g, '');
    const slicedValue = numericValue.slice(0, 4); // Limit to 4 characters

    // Prevent years in the future
    const currentYear = new Date().getFullYear();
    if (slicedValue && parseInt(slicedValue, 10) > currentYear) {
      setYear(currentYear.toString());
      return;
    }

    // Prevent years before 1970
    if (
      slicedValue &&
      slicedValue.length === 4 &&
      parseInt(slicedValue, 10) < 1970
    ) {
      setYear('1970');
      return;
    }

    setYear(slicedValue);
  };

  const handleClearFilters = () => {
    setSelectedMonth({} as IOption);
    setYear('');
  };

  return (
    <Header>
      <FiltersContainer>
        <div>
          <SelectComponent
            id="months"
            label="Selecione o mês que deseja visualizar:"
            options={monthsOptions}
            selectedOption={selectedMonth}
            onChange={option => setSelectedMonth(option)}
            placeholder="Selecione o mês"
          />
        </div>
        <div>
          <Field>
            <Label htmlFor="year">Insira o ano</Label>
            <Input
              id="year"
              type="text"
              placeholder="Ex: 2025"
              value={year}
              onChange={e => handleYearChange(e.target.value)}
            />
          </Field>
        </div>
        <DownloadButton
          type="button"
          onClick={handleGenereateCsv}
          disabled={!selectedMonth || year.length !== 4}
        >
          Baixar CSV <FaFileDownload size={16} />
        </DownloadButton>
        <FilterButton type="button" onClick={handleClearFilters}>
          Limpar
        </FilterButton>
      </FiltersContainer>
    </Header>
  );
};
export default CSVPage;
