'use client';

/* eslint-disable react/jsx-no-useless-fragment */

import Tabs, { ITab } from '@/components/Tabs/Tabs';
import { usePathname } from 'next/navigation';

/**
 * Set of paths where the recruitment tabs should be rendered
 */
const render = new Set(['vagas', 'habilidade', 'idioma']);

const RecruitmentLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  /**
   * Defines the tabs for the recruitment section
   * These tabs will be rendered based on the current path
   * @return array of ITab objects
   */
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

  /**
   * Renders the tabs if the current path matches any of the defined tabs
   * because these tabs should not appear in sub-pages
   */
  const paths = pathname.split('/');
  if (paths.some(path => render.has(path))) {
    return (
      <div>
        <Tabs tabs={tabs} />
        {children}
      </div>
    );
  }

  /**
   * Renders only the children if no tabs are to be displayed
   */
  return <div>{children}</div>;
};
export default RecruitmentLayout;
