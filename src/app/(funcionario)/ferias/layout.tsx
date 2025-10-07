'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';

const tabs: ITab[] = [
  {
    label: 'Férias do mês',
    baseUrl: '/ferias/ferias-do-mes',
    url: '/ferias/ferias-do-mes',
    description: 'Aqui se encontram as férias do mês',
  },
  {
    label: 'Solicitações de férias',
    baseUrl: '/ferias/solicitacoes',
    url: '/ferias/solicitacoes',
    description: 'Aqui se encontram as solicitações de férias',
  },
];

const VacationLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <Tabs tabs={tabs} />
      {children}
    </div>
  );
};

export default VacationLayout;
