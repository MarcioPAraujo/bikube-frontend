'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyApplicationsPage: React.FC = () => {
  const searchParmas = useSearchParams();
  const [vacancyId, setVacancyId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = searchParmas.get('id') || undefined;
    setVacancyId(id);
  }, []);

  return <div>Vagas {vacancyId}</div>;
};
export default MyApplicationsPage;
