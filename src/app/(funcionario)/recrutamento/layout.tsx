'use client';

/* eslint-disable react/jsx-no-useless-fragment */

import Tabs, { ITab } from '@/components/Tabs/Tabs';
import { usePathname } from 'next/navigation';

const render = new Set(['vagas', 'habilidade', 'idioma']);

const RecruitmentLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
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

  const paths = pathname.split('/');
  if (paths.some(path => render.has(path))) {
    return (
      <div>
        <Tabs tabs={tabs} />
        {children}
      </div>
    );
  }

  return <div>{children}</div>;
};
export default RecruitmentLayout;
