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
import PointRegistrationModal from '@/components/modals/PointRegistrationModal/PointRegistrationModal';
import { DetailsButton, Header } from './styles';

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
  'Ações',
];

const rows = Array.from({ length: 10 }, (_, index) => ({
  id: `row-${index + 1}`,
  data: '01/01/2023',
  entradaA: '08:00',
  saidaA: '12:00',
  entradaB: '13:00',
  saidaB: '17:00',
}));

const HistoryPointPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<IOption>({} as IOption);
  const [showDetails, setShowDetails] = useState(false);

  const handleGeneratePdf = async () => {
    try {
      const response = await generatePaySlipPdf(1);

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

  const pagination = usePaginationRange(rows, DEFAULT_PAGE_SIZE);

  return (
    <div>
      <PointRegistrationModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        mode="edit"
      />

      <Header>
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
        <DefaultButton
          text="Baixar holerite"
          variant="bordered"
          type="button"
          onClick={handleGeneratePdf}
        />
      </Header>
      <Table.Root tableClassName="points-history">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(row => (
            <Table.Row key={row.id}>
              <Table.BodyCell>{row.data}</Table.BodyCell>
              <Table.BodyCell>{row.entradaA}</Table.BodyCell>
              <Table.BodyCell>{row.saidaA}</Table.BodyCell>
              <Table.BodyCell>{row.entradaB}</Table.BodyCell>
              <Table.BodyCell>{row.saidaB}</Table.BodyCell>
              <Table.BodyCell>
                <DetailsButton
                  type="button"
                  onClick={() => setShowDetails(true)}
                >
                  Ver detalhes
                </DetailsButton>
              </Table.BodyCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={pagination.currentPage}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={rows.length}
        totalPages={pagination.totalPages}
        totalPaginatedData={pagination.paginatedRows}
      />
    </div>
  );
};
export default HistoryPointPage;
