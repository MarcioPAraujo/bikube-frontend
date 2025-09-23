'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';

const tabs: ITab[] = [
  {
    label: 'Vagas',
    url: '/recrutamento',
    baseUrl: '/recrutamento',
    description: 'Aqui se encontra todas as vagas abertas atualmente',
  },
];

const RecutamentoPage: React.FC = () => {
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};
export default RecutamentoPage;
