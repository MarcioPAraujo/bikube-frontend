import { Icon } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';

interface IVacancyListProps {}

enum Routes {
  APPLICATION_HISTORY = '/area-do-candidato/historico',
}
const VacancyList: React.FC<IVacancyListProps> = () => {
  const router = useRouter();
  return (
    <div>
      <div>
        <h2>Vagas</h2>
        <button
          type="button"
          onClick={() => router.push(Routes.APPLICATION_HISTORY)}
        >
          <Icon name="History" size={20} /> Histórico de candidaturas
        </button>
      </div>
    </div>
  );
};
export default VacancyList;
