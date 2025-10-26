'use client';

import EmployeeCard from '@/components/EmplyeeCard/EmplyeeCard';
import SelectComponent from '@/components/Inputs/Select/Select';
import RenderIf from '@/components/RenderIf/RenderIf';
import { IEmployeeResponse } from '@/interfaces/funcionarios/getListOfEmployeesResponse';
import { IOption } from '@/interfaces/option';
import { getListOfEmployees } from '@/services/funcionarios/funcionariosService';
import { getsectors } from '@/services/setor/setorService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import { Message, PageContainer } from './styles';

const EmployeesPointManagementPage: React.FC = () => {
  const [selectedector, setSelectedector] = useState<IOption>({} as IOption);
  const [employees, setEmployees] = useState<IEmployeeResponse[]>([]);

  let sectorsOptions: IOption[] = [];
  const { data } = useQuery({
    queryKey: ['sectors'],
    queryFn: getsectors,
    select: data => {
      const sectors: IOption[] =
        data.data?.map(sector => ({
          label: sector.nome,
          value: sector.id.toString(),
        })) || [];
      return sectors;
    },
  });

  if (data) {
    sectorsOptions = data;
  }

  const pagination = usePaginationRange(employees, DEFAULT_PAGE_SIZE);

  useEffect(() => {
    const getEmployeesBySector = async () => {
      const response = await getListOfEmployees();
      if (response.data) {
        const filteredEmployees = response.data.filter(
          employee => employee.idsetor.id.toString() === selectedector.value,
        );
        setEmployees(filteredEmployees);
      }
    };
    getEmployeesBySector();
  }, [selectedector]);

  const isEmployeesEmpty = employees.length === 0;
  const hasSelectedSector = selectedector.value !== undefined;

  return (
    <PageContainer>
      <SelectComponent
        id="sector"
        label="Selecione o setor"
        options={sectorsOptions}
        placeholder="Selecione o setor que deseja ver"
        selectedOption={selectedector}
        onChange={option => setSelectedector(option)}
      />
      <RenderIf isTrue={!hasSelectedSector}>
        <Message>
          Por favor, selecione um setor para ver os colaboradores.
        </Message>
      </RenderIf>
      <RenderIf isTrue={hasSelectedSector && !isEmployeesEmpty}>
        <div>
          {pagination.currentRows.map(employee => (
            <EmployeeCard
              key={employee.id}
              name={employee.nome}
              employeeData={employee}
            />
          ))}
        </div>
      </RenderIf>
      <RenderIf isTrue={hasSelectedSector && isEmployeesEmpty}>
        <Message>Nenhum colaborador encontrado para este setor.</Message>
      </RenderIf>
    </PageContainer>
  );
};
export default EmployeesPointManagementPage;
