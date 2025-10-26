'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';

const RecruitmentLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const tabs: ITab[] = [
    {
      label: 'Vagas',
      url: '/recrutamento/vagas',
      baseUrl: '/recrutamento/vagas',
      description: 'Aqui se encontra todas as vagas abertas atualmente',
    },
    {
      label: 'Habilidades',
      url: '/recrutamento/habilidade',
      baseUrl: '/recrutamento/habilidade',
      description: 'Gerencie as habilidades necessárias para as vagas',
    },
    {
      label: 'Idiomas',
      url: '/recrutamento/idioma',
      baseUrl: '/recrutamento/idioma',
      description: 'Gerencie os idiomas necessários para as vagas',
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
