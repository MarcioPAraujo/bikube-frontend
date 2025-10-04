import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { theme } from '@/styles/theme';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAmountOfApplicantsByStep } from '@/services/vacancy/vacancyService';
import { ChartContainer, ChartInner, ChartTitle } from './styles';

interface ApplicantByStepProps {
  vacancyId: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ApplicantByStep: React.FC<ApplicantByStepProps> = ({ vacancyId }) => {
  const { data: amount, isPlaceholderData } = useQuery({
    queryKey: ['applicants-by-step', vacancyId],
    queryFn: () => getAmountOfApplicantsByStep(vacancyId),
    placeholderData: keepPreviousData,
  });

  const values = [
    amount?.data?.etapas.TRIAGEM || 0,
    amount?.data?.etapas.ENTREVISTA || 0,
    amount?.data?.etapas.OFERTA || 0,
  ];

  if (!amount && !isPlaceholderData) return null;

  const maxValue = Math.max(...values);
  const stepSize = maxValue > 10 ? Math.ceil(maxValue / 10) : 1;

  const data: ChartData<'bar'> = {
    labels: ['Triagem', 'Entrevista', 'Oferta'],
    datasets: [
      {
        label: 'Candidatos',
        data: values,
        backgroundColor: theme.colors.YELLOW.hex_F6B31B,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          useBorderRadius: true,
          pointStyle: 'circle',
          borderRadius: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <ChartTitle>Aplicantes por etapa</ChartTitle>
      <ChartInner>
        <Bar data={data} options={options} />
      </ChartInner>
    </ChartContainer>
  );
};
export default ApplicantByStep;
