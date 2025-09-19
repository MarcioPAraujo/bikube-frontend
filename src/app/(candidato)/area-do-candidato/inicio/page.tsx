'use client';

import CandidateHomeFooter from '@/components/CandidateHome/Footer/CandidateHomeFooter';
import CandidateHomeHeader from '@/components/CandidateHome/Header/CandidateHomeHeader';
import CandidateHomeMain from '@/components/CandidateHome/Main/CandiateHomeMain';
import { CSSProperties } from 'react';

const styles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const HomePageCandidate: React.FC = () => {
  return (
    <div style={styles}>
      <CandidateHomeHeader />
      <CandidateHomeMain />
      <CandidateHomeFooter />
    </div>
  );
};
export default HomePageCandidate;
