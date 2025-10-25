'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';

const RecruitmentLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const tabs: ITab[] = [
    {
      label: 'Vagas',
      url: '/recrutamento',
      baseUrl: '/recrutamento',
      description: 'Aqui se encontra todas as vagas abertas atualmente',
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
      {children}
    </div>
  );
};
export default RecruitmentLayout;
