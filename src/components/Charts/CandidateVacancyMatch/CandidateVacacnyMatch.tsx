import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  ChartData,
  ChartOptions,
  Plugin,
} from 'chart.js';
import { theme } from '@/styles/theme';
import { ChartContainer } from './styles';

ChartJS.register(ArcElement, Tooltip);

const annotation: Plugin<'doughnut'> = {
  id: 'annotation',
  beforeDraw: (chart: ChartJS<'doughnut'>) => {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.font = '700 2.6rem Mulish';
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'bottom';

    const value = chart.config.data.datasets[0].data[0].toString();
    const textX = Math.round((width - ctx.measureText(value).width) / 2 - 10);
    const textY = height;

    ctx.fillText(`${value}%`, textX, textY);
    ctx.restore();
  },
};

interface CandidateVacancyMatchProps {
  matchPercentage: number;
}

const CandidateVacancyMatch: React.FC<CandidateVacancyMatchProps> = ({
  matchPercentage,
}) => {
  const lackOfCompatibility = 100 - matchPercentage;

  const data: ChartData<'doughnut'> = {
    labels: ['Possui', 'Não possui'],
    datasets: [
      {
        data: [matchPercentage, lackOfCompatibility],
        backgroundColor: [theme.colors.YELLOW.hex_F6B31B, '#e1e1e1'],
        hoverBackgroundColor: [theme.colors.YELLOW.hex_FFB936, '#e1e1e1'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    aspectRatio: 2,
    circumference: 180,
    rotation: -90,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: 'Match com a vaga',
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  const plugin: Plugin<'doughnut'>[] = [annotation];

  return (
    <ChartContainer>
      <Doughnut data={data} options={options} plugins={plugin} />
    </ChartContainer>
  );
};
export default CandidateVacancyMatch;
