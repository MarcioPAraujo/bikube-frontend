'use client';

import { useRouter } from 'next/navigation';

const CandidateLoginPage: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <button type="button" onClick={() => router.back()}>
        back
      </button>
    </div>
  );
};
export default CandidateLoginPage;
