import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Plugin,
} from 'chart.js';
import { theme } from '@/styles/theme';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getAmountOfApplicantsByStep } from '@/services/vacancy/vacancyService';
import { ChartContainer, ChartWrapper } from './styles';

interface IGivingUpChartProps {
  vacancyId: number;
}
ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutCenterText: Plugin<'doughnut'> = {
  id: 'doughnutCenterText',
  beforeDraw(chart: ChartJS<'doughnut'>) {
    const { ctx } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.fillStyle = theme.colors.YELLOW.hex_F6B31B;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 3.2rem Mulish, sans-serif';
    const dropouts = chart.config.data.datasets[0].data[0].toString();
    ctx.fillText(`${dropouts}%`, xCoor, yCoor);
  },
};

const GivingUpChart: React.FC<IGivingUpChartProps> = ({ vacancyId }) => {
  const { data: amount } = useQuery({
    queryKey: ['applicants-by-step', vacancyId],
    queryFn: () => getAmountOfApplicantsByStep(vacancyId),
    placeholderData: keepPreviousData,
  });

  const totalApplicants =
    (amount?.data?.etapas.TRIAGEM || 0) +
    (amount?.data?.etapas.ENTREVISTA || 0) +
    (amount?.data?.etapas.OFERTA || 0);

  const totalWithDropouts =
    totalApplicants + (amount?.data?.etapas.DESISTENCIA || 0);

  const dropouts = amount?.data?.etapas.DESISTENCIA || 0;

  const dropoutRate = totalWithDropouts
    ? Math.round((dropouts / totalWithDropouts) * 100)
    : 0;

  const continuing = 100 - dropoutRate;

  const data: ChartData<'doughnut'> = {
    labels: ['Desistentes', 'Continuam'],
    datasets: [
      {
        data: [dropoutRate, continuing],
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: ['#FF6384', '#36A2EB'],
        borderWidth: 0,
      },
    ],
  };
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          pointStyle: 'circle',
          borderRadius: 0,
          usePointStyle: true,
          pointStyleWidth: 18,
          padding: 20,
        },
      },
    },
  };

  const plugins = [doughnutCenterText];

  return (
    <ChartWrapper>
      <h3>Desitentes</h3>
      <ChartContainer>
        <Doughnut data={data} options={options} plugins={plugins} />
      </ChartContainer>
    </ChartWrapper>
  );
};
export default GivingUpChart;
