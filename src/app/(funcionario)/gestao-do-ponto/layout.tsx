'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';
import { useAuth } from '@/hooks/useAuth';

// Defines the tabs for the point management section
const tabs: ITab[] = [
  {
    label: 'Registros de ponto',
    baseUrl: '/gestao-do-ponto/registro',
    url: '/gestao-do-ponto/registro',
    description: 'Registre seus horários de entrada e saída.',
  },
  {
    label: 'Historico de ponto',
    baseUrl: '/gestao-do-ponto/historico',
    url: '/gestao-do-ponto/historico',
    description: 'Veja o histórico dos seus registros de ponto.',
  },
  {
    label: 'Gestão do ponto dos colaboradores',
    baseUrl: '/gestao-do-ponto/colaboradores',
    url: '/gestao-do-ponto/colaboradores',
    description: 'Gerencie os pontos dos colaboradores.',
  },
  {
    label: 'Feriados',
    baseUrl: '/gestao-do-ponto/feriados',
    url: '/gestao-do-ponto/feriados',
    description: 'Visualize os feriados oficiais.',
  },
  {
    label: 'Exportar CSV',
    baseUrl: '/gestao-do-ponto/csv',
    url: '/gestao-do-ponto/csv',
    description: 'Importe registros de ponto via arquivo CSV.',
  },
];

const PointLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  /**
   * Filters the tabs based on the user's role
   * to restrict access to certain sections
   * for 'FUNCIONARIO' role users
   */
  const filteredTabs = tabs.filter(tab => {
    if (!user) return false;
    if (user.role === 'FUNCIONARIO' && tab.baseUrl.includes('/colaboradores')) {
      return false;
    }
    if (user.role === 'FUNCIONARIO' && tab.baseUrl.includes('/csv')) {
      return false;
    }
    return true;
  });
  return (
    <div>
      <Tabs tabs={filteredTabs} />
      {children}
    </div>
  );
};
export default PointLayout;
