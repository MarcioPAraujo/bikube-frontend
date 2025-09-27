import { Doughnut } from 'react-chartjs-2';
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  Plugin,
} from 'chart.js';
import { theme } from '@/styles/theme';
import { ChartContainer, ChartWrapper } from './styles';

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
    const matches = chart.config.data.datasets[0].data[0].toString();
    ctx.fillText(`${matches}%`, xCoor, yCoor);
  },
};

const VacancyMatchesChart: React.FC = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Pussuem', 'Não possuem'],
    datasets: [
      {
        data: [90, 10],
        backgroundColor: ['#36A2EB', '#FF6384'],
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

  const plugins: Plugin<'doughnut'>[] = [doughnutCenterText];

  return (
    <ChartWrapper>
      <h3>Aplicantes que possuem os requisistos da vaga</h3>
      <ChartContainer>
        <Doughnut data={data} options={options} plugins={plugins} />
      </ChartContainer>
    </ChartWrapper>
  );
};
export default VacancyMatchesChart;
