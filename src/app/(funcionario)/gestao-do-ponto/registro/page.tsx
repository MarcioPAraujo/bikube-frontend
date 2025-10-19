'use client';

import Entries from '@/components/WatchPoint/Entries/Entries';
import Watch from '@/components/WatchPoint/Watch/Watch';
import { PageContainer } from './styles';

const Point: React.FC = () => {
  return (
    <PageContainer>
      <Watch
        onSaveTime={time => {
          console.log('Ponto registrado em:', time);
        }}
      />
      <Entries refresh={false} />
    </PageContainer>
  );
};
export default Point;
