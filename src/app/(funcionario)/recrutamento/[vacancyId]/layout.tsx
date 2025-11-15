'use client';

import Tabs, { ITab } from '@/components/Tabs/Tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Icon } from '@/components/Icons/Icons';
import IconButton from '@/components/Buttons/IconButton';
import { PageTitle, SubtitleContainer } from './styles';

interface IChildrenProps {
  children: React.ReactNode;
}

/**
 * Layout component for vacancy details, steps, and dashboard pages
 * It renders tabs for navigation between these sections
 * and displays the vacancy name based on URL search parameters
 */
const Layout: React.FC<IChildrenProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vacancyName, setVacancyName] = useState<string>('');

  /**
   * Sets the vacancy name from URL search parameters
   * on component mount and when searchParams change
   */
  useEffect(() => {
    const name = searchParams.get('nome');
    if (name) {
      setVacancyName(name);
    }
  }, [searchParams]);

  /**
   * Renders a back button and vacancy name
   * when on the candidates sub-page
   * No tabs are displayed in this case
   */
  if (pathname.includes('candidatos')) {
    return (
      <div>
        <SubtitleContainer style={{ alignItems: 'baseline' }}>
          <IconButton
            onClick={() => router.back()}
            iconNode={<Icon name="ArrowLeft" />}
          />
          <PageTitle>{vacancyName}</PageTitle>
        </SubtitleContainer>
        {children}
      </div>
    );
  }

  /**
   * Defines the base paths for the tabs
   * by manipulating the current pathname
   */
  const pathnameArr = pathname.split('/');
  pathnameArr.pop();
  const dashboardPath = [...pathnameArr, 'dashboard'].join('/');
  const stepsPath = [...pathnameArr, 'etapas'].join('/');
  const detailsPath = [...pathnameArr, 'detalhes'].join('/');

  const steps = `${stepsPath}?nome=${vacancyName}`;
  const dashboard = `${dashboardPath}?nome=${vacancyName}`;
  const details = `${detailsPath}?nome=${vacancyName}`;

  // Defines the tabs for vacancy navigation
  const tabs: ITab[] = [
    {
      label: 'Detalhes',
      baseUrl: detailsPath,
      url: details,
      description: 'aqui estão as informações da vaga',
    },
    {
      label: 'Etapas',
      baseUrl: stepsPath,
      url: steps,
      description: 'aqui se encontra as etapas do processo seletivo',
    },
    {
      label: 'Dashboard',
      baseUrl: dashboardPath,
      url: dashboard,
      description: 'aqui estão relatórios sobre a vaga',
    },
  ];

  // Renders the layout with tabs and vacancy name
  return (
    <div>
      <PageTitle>{vacancyName}</PageTitle>
      <SubtitleContainer>
        <IconButton
          onClick={() => router.push('/recrutamento/vagas')}
          iconNode={<Icon name="ArrowLeft" />}
        />
        <p>Fases do processo seletivo</p>
      </SubtitleContainer>
      <Tabs tabs={tabs} />
      {children}
    </div>
  );
};

const VacancyLayout: React.FC<IChildrenProps> = ({ children }) => {
  return (
    <Suspense>
      <Layout>{children}</Layout>
    </Suspense>
  );
};
export default VacancyLayout;
