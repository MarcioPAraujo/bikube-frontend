'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';
import { useAuth } from '@/hooks/useAuth';

const tabs: ITab[] = [
  {
    label: 'Minhas férias',
    baseUrl: '/ferias/minhas-ferias',
    url: '/ferias/minhas-ferias',
    description: 'Aqui se encontram as suas férias',
  },
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
  const { user } = useAuth();

  const isEmployee = user?.role === 'FUNCIONARIO';

  const filteredTabs = isEmployee ? [tabs[0]] : tabs;

  return (
    <div>
      <Tabs tabs={filteredTabs} />
      {children}
    </div>
  );
};

export default VacationLayout;
