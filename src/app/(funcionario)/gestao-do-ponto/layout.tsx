'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';
import { useAuth } from '@/hooks/useAuth';

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
    label: 'Solicitações de ajuste',
    baseUrl: '/gestao-do-ponto/solicitacoes',
    url: '/gestao-do-ponto/solicitacoes',
    description: 'Gerencie suas solicitações de ajuste de ponto.',
  },
  {
    label: 'Gestão do ponto dos colaboradores',
    baseUrl: '/gestao-do-ponto/colaboradores',
    url: '/gestao-do-ponto/colaboradores',
    description: 'Gerencie os pontos dos colaboradores.',
  },
];

const PointLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const filteredTabs = tabs.filter(tab => {
    if (!user) return false;
    if (user.role === 'FUNCIONARIO' && tab.baseUrl.includes('/colaboradores')) {
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
