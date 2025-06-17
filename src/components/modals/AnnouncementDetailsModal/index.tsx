import ModalBackground from '../elements/ModalBackground';
import ModalTitle from '../elements/ModalTitle';
import { Container, Content, Modal, Subject } from './styles';

interface AnnouncementDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcementId: string;
}
const AnnouncementDetailsModal: React.FC<AnnouncementDetailsModalProps> = ({ isOpen, onClose, announcementId }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Modal>
        <ModalTitle text="Comunicado" onClose={onClose} />
        <Container>
          <Subject>
            <strong>Assunto:</strong>
            <p>Título do comunicado</p>
          </Subject>
          <Subject>
            <strong>Data:</strong>
            <p>22/07/2008</p>
          </Subject>
          <Content>
            <strong>Conteúdo:</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non rem distinctio
              itaque ex dolorem magnam ad nisi adipisci maiores suscipit, repellat esse, odio recusandae quas aut atque
              quisquam saepe hic. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, ex modi. Hic animi
              sit nulla iure dignissimos facilis sequi cupiditate porro enim repudiandae, aliquid amet facere rem ullam
              nihil deserunt eum tempore vel ab excepturi perspiciatis optio? Natus, sed quibusdam iusto culpa modi sint
              eos repellendus sequi aliquam saepe. Exercitationem delectus iure nostrum vitae illo corrupti laboriosam.
              Quo praesentium eveniet maiores voluptatibus saepe eaque labore laborum illum rerum iusto, deleniti unde
              tenetur exercitationem. Molestias labore fuga dolores ad reprehenderit ipsa nesciunt doloremque repellat
              ratione nihil. Consectetur, laudantium quis rem molestias porro esse ut aliquam accusantium nemo eligendi
              dolorum reiciendis explicabo incidunt, tempora nisi sapiente aperiam officiis. Recusandae laborum corrupti
              voluptatem labore voluptate laudantium aspernatur saepe optio distinctio, doloribus architecto odit
              molestiae aperiam aliquam cumque quia quas vel nemo soluta sed necessitatibus. Delectus fuga voluptate
              temporibus. Libero consequatur non nulla ab odit! Eius, ex ullam. Rerum a assumenda commodi quasi repellat
              ullam exercitationem cumque sit ea similique molestiae, consequatur quos fuga voluptate omnis, debitis
              sint eligendi. Minima suscipit ipsa ducimus laboriosam est, quisquam necessitatibus architecto rem tempore
              veniam quasi laborum velit debitis nihil cumque, quis consequuntur et quaerat explicabo cum. Et iusto,
              porro perspiciatis eos nostrum distinctio veritatis harum mollitia error.
            </p>
          </Content>
        </Container>
      </Modal>
    </ModalBackground>
  );
};
export default AnnouncementDetailsModal;
