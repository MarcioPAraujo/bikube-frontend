'use client';

import CandidateHomeFooter from '@/components/CandidateHome/Footer/CandidateHomeFooter';
import CandidateHomeHeader from '@/components/CandidateHome/Header/CandidateHomeHeader';
import CandidateHomeMain from '@/components/CandidateHome/Main/CandiateHomeMain';

const HomePageCandidate: React.FC = () => {
  return (
    <div>
      <CandidateHomeHeader />
      <CandidateHomeMain />
      <CandidateHomeFooter />
    </div>
  );
};
export default HomePageCandidate;
