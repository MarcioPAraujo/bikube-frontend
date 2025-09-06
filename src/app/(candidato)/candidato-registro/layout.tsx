'use client';

import { useStepsRegistration } from '@/hooks/useStepsRegistration';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import {
  BarContent,
  ChildenWrapper,
  Header,
  Main,
  ProgressbarContainer,
} from './layoutStyles';

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

const RegistrationLayout: FC<IChildren> = ({ children }) => {
  const { currentStep } = useStepsRegistration();

  return (
    <Main>
      <Header>
        <ProgressbarContainer>
          <BarContent className={stepClassname[currentStep]} />
        </ProgressbarContainer>
        <Image
          src="/images/default-logo.png"
          width={218}
          height={90}
          alt="logo da bikube"
        />
      </Header>
      <ChildenWrapper>{children}</ChildenWrapper>
    </Main>
  );
};
export default RegistrationLayout;
