'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const Page: React.FC = () => {
  const searchParmas = useSearchParams();
  const [vacancyId, setVacancyId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = searchParmas.get('id') || undefined;
    setVacancyId(id);
  }, []);

  return <div>Vagas {vacancyId}</div>;
};

const MyApplicationsPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Page />
    </Suspense>
  );
};
export default MyApplicationsPage;
