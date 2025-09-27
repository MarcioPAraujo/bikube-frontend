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
import { ChartContainer, ChartInner, ChartTitle } from './styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const values = [50, 30, 20];

const ApplicantByStep: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['Triagem', 'Entrevista', 'Proposta'],
    datasets: [
      {
        label: 'Candidatos',
        data: values,
        backgroundColor: theme.colors.YELLOW.hex_F6B31B,
      },
    ],
  };

  const maxValue = Math.max(...values);
  const stepSize = maxValue > 10 ? Math.ceil(maxValue / 10) : 1;

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
