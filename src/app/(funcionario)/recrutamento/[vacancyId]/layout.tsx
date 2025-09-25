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

const Layout: React.FC<IChildrenProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vacancyName, setVacancyName] = useState<string>('');

  useEffect(() => {
    const name = searchParams.get('nome');
    if (name) {
      setVacancyName(name);
    }
  }, [searchParams]);

  if (pathname.includes('candidatos')) {
    return (
      <div>
        <PageTitle>{vacancyName}</PageTitle>
        {children}
      </div>
    );
  }

  const pathnameArr = pathname.split('/');
  pathnameArr.pop();
  const dashboardPath = [...pathnameArr, 'dashboard'].join('/');
  const stepsPath = [...pathnameArr, 'etapas'].join('/');

  const steps = `${stepsPath}?nome=${vacancyName}`;
  const dashboard = `${dashboardPath}?nome=${vacancyName}`;

  const tabs: ITab[] = [
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

  return (
    <div>
      <PageTitle>{vacancyName}</PageTitle>
      <SubtitleContainer>
        <IconButton
          onClick={() => router.push('/recrutamento')}
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
