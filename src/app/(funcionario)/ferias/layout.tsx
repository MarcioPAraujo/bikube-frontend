'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';
import { useAuth } from '@/hooks/useAuth';

// Defines the tabs for the vacation section
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

/**
 * Layout component for the vacation section
 * It renders the tabs based on the user role
 */
const VacationLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();

  const isEmployee = user?.role === 'FUNCIONARIO';

  /**
   * Filters the tabs based on the user role
   * Employees only see the "Minhas férias" tab
   */
  const filteredTabs = isEmployee ? [tabs[0]] : tabs;

  return (
    <div>
      <Tabs tabs={filteredTabs} />
      {children}
    </div>
  );
};

export default VacationLayout;
