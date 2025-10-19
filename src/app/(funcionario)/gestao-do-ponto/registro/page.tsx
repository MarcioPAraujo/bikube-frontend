'use client';

import Watch from '@/components/Watch/Watch';

const Point: React.FC = () => {
  return (
    <div>
      <Watch
        onSaveTime={time => {
          console.log('Ponto registrado em:', time);
        }}
      />
    </div>
  );
};
export default Point;
