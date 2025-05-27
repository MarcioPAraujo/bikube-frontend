import SelectComponent from '@/components/Inputs/Select';
import { IOption } from '@/interfaces/option';
import { getsectors } from '@/services/setor/setorService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const EmployeeForm = () => {
  const [selectedSector, setSelectedSector] = useState<IOption>({} as IOption);

  const { data: sectors, isFetching } = useQuery({
    queryKey: ['sectors'],
    queryFn: () => getsectors(),
  });

  const sectorsOptions: IOption[] =
    sectors?.data?.map(sector => ({
      value: sector.id.toString(),
      label: sector.nome,
    })) || [];

  const handleSectorChange = (option: IOption) => {
    setSelectedSector(option);
  };

  return (
    <div>
      <h1>Employee Form</h1>
      <SelectComponent
        id="sector-select"
        options={sectorsOptions}
        selectedOption={selectedSector}
        setSelectedOption={setSelectedSector}
        onChange={handleSectorChange}
        placeholder="Selecione um setor"
        disabled={isFetching}
        label="Setor"
        enableSearch
      />
    </div>
  );
};
export default EmployeeForm;
