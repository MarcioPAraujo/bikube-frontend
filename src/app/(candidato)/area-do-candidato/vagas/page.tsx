'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const Vacancies: React.FC = () => {
  const searchParmas = useSearchParams();
  const [vacancyId, setVacancyId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = searchParmas.get('id') || undefined;
    setVacancyId(id);
  }, []);

  return <div>Vagas {vacancyId}</div>;
};

const VacanciesPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Vacancies />
    </Suspense>
  );
};
export default VacanciesPage;
