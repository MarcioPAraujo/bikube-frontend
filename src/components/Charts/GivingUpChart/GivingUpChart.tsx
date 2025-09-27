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
    const dropouts = chart.config.data.datasets[0].data[0].toString();
    ctx.fillText(`${dropouts}%`, xCoor, yCoor);
  },
};

const GivingUpChart: React.FC = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Desistentes', 'Continuam'],
    datasets: [
      {
        data: [10, 90],
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
