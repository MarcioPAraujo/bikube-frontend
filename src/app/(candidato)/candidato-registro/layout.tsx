'use client';

import { StepsRegistrationProvider, useStepsRegistration } from '@/hooks/useStepsRegistration';
import Image from 'next/image';
import { FC, ReactNode, Suspense } from 'react';
import { BarContent, ChildenWrapper, Header, Main, ProgressbarContainer } from './layoutStyles';

interface IChildren {
  children: ReactNode;
}

const stepClassname: Record<number, string> = {
  1: 'step-1',
  2: 'step-2',
  3: 'step-3',
  4: 'step-4',
  5: 'step-5',
};

const Layout: FC<IChildren> = ({ children }) => {
  const { currentStep } = useStepsRegistration();

  return (
    <Main>
      <Header>
        <ProgressbarContainer>
          <BarContent className={stepClassname[currentStep]} />
        </ProgressbarContainer>
        <Image src="/images/default-logo.png" width={218} height={90} alt="logo da bikube" />
      </Header>
      <ChildenWrapper>{children}</ChildenWrapper>
    </Main>
  );
};

const RegistrationLayout: FC<IChildren> = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <StepsRegistrationProvider>
        <Layout>{children}</Layout>
      </StepsRegistrationProvider>
    </Suspense>
  );
};
export default RegistrationLayout;
