import { useQuery } from '@tanstack/react-query';
import { getAnnouncementsDetails } from '@/services/announcementsService';
import { format, parseISO } from 'date-fns';
import { IAnnouncementsDetailsResponse } from '@/interfaces/anouncement/announcementDetailsResponse';
import ModalBackground from '../elements/ModalBackground';
import ModalTitle from '../elements/ModalTitle';
import { Container, Content, Modal, Subject } from './styles';

interface AnnouncementDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcementId: number;
}
const AnnouncementDetailsModal: React.FC<AnnouncementDetailsModalProps> = ({
  isOpen,
  onClose,
  announcementId,
}) => {
  let details: IAnnouncementsDetailsResponse = {
    datacriacao: '',
    id: 0,
    texto: '',
    titulo: '',
  };
  const { data } = useQuery({
    enabled: isOpen,
    queryKey: ['announcement', announcementId],
    queryFn: () => getAnnouncementsDetails(announcementId),
  });

  if (data?.data) {
    details = data.data;
  }

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Modal>
        <ModalTitle text="Comunicado" onClose={onClose} />
        <Container>
          <Subject>
            <strong>Assunto:</strong>
            <p>{details.titulo}</p>
          </Subject>
          <Subject>
            <strong>Data:</strong>
            <p>
              {details.datacriacao
                ? format(parseISO(details.datacriacao), 'dd/MM/yyyy')
                : '-'}
            </p>
          </Subject>
          <Content>
            <strong>Conteúdo:</strong>
            <p>{details.texto}</p>
          </Content>
        </Container>
      </Modal>
    </ModalBackground>
  );
};
export default AnnouncementDetailsModal;
