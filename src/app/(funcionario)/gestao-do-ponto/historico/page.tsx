'use client';

import { DefaultButton } from '@/components/Buttons/DefaultButton';
import SelectComponent from '@/components/Inputs/Select/Select';
import { IOption } from '@/interfaces/option';
import { generatePaySlipPdf } from '@/services/paySlip/paySlipService';
import { notifyError } from '@/utils/handleToast';
import { useState } from 'react';
import { Table } from '@/components/Table/Index/Index';
import Pagination from '@/components/Pagination/Pagination';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import { ListaEntrada } from '@/interfaces/mirror/employeeMirrorResponse';
import { useQuery } from '@tanstack/react-query';
import { getMyMirrors } from '@/services/mirror/mirrorService';
import { format, parseISO } from 'date-fns';
import RenderIf from '@/components/RenderIf/RenderIf';
import {
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

const columns = [
  'Data',
  'Entrada - A',
  'Saída - A',
  'Entrada - B',
  'Saída - B',
  'Ausência',
  'Abono',
];

const emptyEntries = Array.from({ length: 4 }, () => '-- : -- : --');

const HistoryPointPage: React.FC = () => {
  const [mirrorId, setMirrorId] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<IOption>({} as IOption);
  const [year, setYear] = useState<string>('');
  const [filterdDate, setFilteredDate] = useState<Date | null>(null);

  let marksOfMonth: ListaEntrada[] = [];
  const { data } = useQuery({
    queryKey: ['mirror-history', filterdDate],
    queryFn: async () => {
      const mirrors = await getMyMirrors();
      if (!mirrors.data || !filterdDate) return [];
      const parsedDate = format(filterdDate, 'yyyy-MM-dd');

      const mirrorOfMonth = mirrors.data.filter(mirr => {
        return mirr.periodoInicio === parsedDate;
      });
      if (mirrorOfMonth.length > 0) {
        setMirrorId(mirrorOfMonth[0].id);
        return mirrorOfMonth;
      }
      return [];
    },
  });

  if (data) {
    marksOfMonth = data[0]?.listaEntradas || [];
  }

  const pagination = usePaginationRange(marksOfMonth, DEFAULT_PAGE_SIZE);

  const handleGeneratePdf = async () => {
    if (!mirrorId) {
      notifyError('Nenhum espelho selecionado para gerar o PDF.');
      return;
    }
    try {
      const response = await generatePaySlipPdf(mirrorId);

      if (response.error) {
        notifyError(response.error);
        return;
      }
      if (!response.data) {
        notifyError('Nenhum dado recebido para o PDF.');
        return;
      }

      const url = response.data;

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'espelho.pdf'); // Set the file name

      // Append to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
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

  const handleApplyFilters = () => {
    if (!selectedMonth || !year) return;

    const month = parseInt(selectedMonth.value, 10) - 1;
    const date = new Date(parseInt(year, 10), month, 1);
    setFilteredDate(date);
  };
  const handleClearFilters = () => {
    setSelectedMonth({} as IOption);
    setYear('');
    setFilteredDate(null);
  };

  const isGenerateDisabled = () => {
    if (!filterdDate) return true;
    const currentDate = new Date();
    if (filterdDate.getFullYear() > currentDate.getFullYear()) {
      return true;
    }
    if (
      filterdDate.getFullYear() === currentDate.getFullYear() &&
      filterdDate.getMonth() >= currentDate.getMonth()
    ) {
      return true;
    }
    return false;
  };

  const formatHour = (hour: string) => {
    return hour.slice(0, 8);
  };

  return (
    <div>
      <Header>
        <FiltersContainer>
          <SelectComponent
            id="months"
            label="Selecione o mês que deseja visualizar:"
            options={monthsOptions}
            selectedOption={selectedMonth}
            onChange={option => setSelectedMonth(option)}
            placeholder="Selecione o mês"
          />
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
          <FilterButton
            type="button"
            onClick={handleApplyFilters}
            disabled={!selectedMonth || year.length !== 4}
          >
            Filtrar
          </FilterButton>
          <FilterButton type="button" onClick={handleClearFilters}>
            Limpar
          </FilterButton>
        </FiltersContainer>
        <DefaultButton
          text="Baixar espelho"
          variant="bordered"
          type="button"
          onClick={handleGeneratePdf}
          disabled={isGenerateDisabled()}
        />
      </Header>
      <Table.Root tableClassName="points-history">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(row => (
            <Table.Row key={row.id}>
              <Table.BodyCell>
                {format(parseISO(row.data), 'dd/MM/yyyy')}
              </Table.BodyCell>
              <RenderIf isTrue={row.entradas.length >= 1}>
                {row.entradas.map(entry => (
                  <Table.BodyCell key={entry.id}>
                    {formatHour(entry.hora)}
                  </Table.BodyCell>
                ))}
                {row.entradas.length < 4 &&
                  Array.from({ length: 4 - row.entradas.length }).map(
                    (_, index) => (
                      <Table.BodyCell key={index}>-- : -- : --</Table.BodyCell>
                    ),
                  )}
                <Table.BodyCell>{row.ausencia ? 'Sim' : 'Não'}</Table.BodyCell>
                <Table.BodyCell>{row.descricaoAbono || '-'}</Table.BodyCell>
              </RenderIf>
              <RenderIf isTrue={row.entradas.length === 0}>
                {emptyEntries.map((entry, index) => (
                  <Table.BodyCell key={index}>{entry}</Table.BodyCell>
                ))}
                <Table.BodyCell>{row.ausencia ? 'Sim' : 'Não'}</Table.BodyCell>
                <Table.BodyCell>{row.descricaoAbono || '-'}</Table.BodyCell>
              </RenderIf>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={marksOfMonth.length}
        totalPages={pagination.totalPages}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default HistoryPointPage;
