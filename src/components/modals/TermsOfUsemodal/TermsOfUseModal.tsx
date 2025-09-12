import { FC } from 'react';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { termsOfUseService } from '@/services/termsOfUse/termsofUseService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TermsOfUseSchema,
  ITermsOfUseSchema,
} from '@/validation/TermsOfUse/TermsOfUseSchema';
import { notifyError } from '@/utils/handleToast';
import {
  BlurBackground,
  ButtonContainer,
  Container,
  Form,
  TextArea,
  TextContainer,
  Title,
} from './styles';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
  email: string;
}
const TermsOfUseModal: FC<IProps> = ({
  isOpen,
  onClose,
  onAccept,
  onReject,
  email,
}) => {
  const { handleSubmit, setValue } = useForm<ITermsOfUseSchema>({
    resolver: yupResolver(TermsOfUseSchema),
    mode: 'onChange',
    defaultValues: {
      email,
    },
  });
  setValue('email', email);
  const onFormSubmit = async (data: ITermsOfUseSchema) => {
    const response = await termsOfUseService(data.email);
    if (response.error) {
      notifyError(response.error);
      return;
    }

    onAccept();
    onClose();
  };
  if (!isOpen) return null;
  return (
    <Container>
      <BlurBackground />
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Title>Termos de uso</Title>
        <TextContainer>
          <TextArea
            readOnly
            value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, cumque delectus! Suscipit iure iusto quos
            maxime officiis culpa ratione consequatur officia modi veritatis excepturi voluptatibus, hic voluptas sunt
            corporis numquam illo totam accusamus, voluptatum tenetur voluptatem, sed odit omnis mollitia! Consequuntur
            optio culpa molestiae distinctio vitae eum enim, nihil neque aspernatur veritatis maxime sunt quisquam
            suscipit itaque quas blanditiis reiciendis perspiciatis nisi. Rerum ab quod molestiae, debitis
            necessitatibus impedit quas officia asperiores perferendis reprehenderit aliquid, illo, alias velit beatae a
            esse sit molestias. Deleniti aliquam nisi obcaecati maxime nihil. Pariatur, asperiores facilis itaque
            reprehenderit porro sunt aliquid incidunt nulla. Odio alias veritatis quod non sed quibusdam explicabo
            facere ex consequatur corporis aliquam at, suscipit deserunt et praesentium aut, incidunt quidem inventore
            quo ducimus beatae culpa atque! Aliquid maiores fuga quae quibusdam alias. Reiciendis asperiores quae
            dolores autem aliquam natus praesentium deleniti neque? Voluptates iusto cupiditate numquam, nesciunt
            dolorum eos ab unde? Dolore cupiditate beatae illo fugit mollitia ipsam unde nobis doloribus, sapiente
            maxime libero rem distinctio, excepturi architecto eligendi labore! Obcaecati quasi ullam eaque laboriosam
            consequatur officia hic quam! Nobis, praesentium molestiae amet eos dolores corporis eveniet similique
            assumenda sed. Aliquam iure iste perferendis earum placeat doloremque? Non consequatur, quaerat harum
            tenetur veritatis odit dolorem voluptas placeat nisi tempore commodi provident quasi similique, expedita
            fugiat odio repellat. Ratione nemo voluptates sed neque adipisci. Rem, iusto reiciendis. Sapiente, deserunt
            neque. Impedit in voluptatem, pariatur aliquid nihil fugiat. Eum, rerum suscipit consequatur consectetur
            assumenda quos cumque iste corporis, obcaecati vitae numquam cupiditate commodi praesentium eos animi.
            Magnam sint quasi voluptas autem sapiente voluptatum nulla adipisci distinctio et praesentium aliquid nihil
            ducimus consequatur, amet modi sit officia illum, vel in illo alias provident, accusamus odit enim? Quos,
            ipsa nisi veniam natus hic libero? Explicabo quisquam fuga repudiandae maxime obcaecati pariatur dolorem.
            Ipsam vitae tempore ipsa aliquid magni natus iure? Pariatur tempore fugiat quia aliquid quaerat adipisci
            sunt, qui eos ut debitis alias perferendis. Vitae nam enim at amet vero, autem repellendus voluptatibus
            voluptates possimus magni odit ab. Incidunt, numquam doloremque dolore maiores ipsam minima iure odio? In
            quis deleniti, praesentium incidunt, alias sint enim, rem optio blanditiis quae quibusdam doloribus ut
            aliquid eum recusandae maiores dolor reprehenderit nisi. Quod ex nulla id excepturi odio, iusto temporibus
            neque quia dolorum. Quidem neque, quaerat obcaecati minima sequi error nostrum unde culpa exercitationem
            dolores suscipit sunt sint id, at, vero iure perferendis aspernatur quisquam doloremque mollitia velit
            assumenda? Fugiat officiis illum odio aliquid optio sit nesciunt dolor cum est iusto facere, aut commodi
            enim perferendis voluptatibus ab mollitia necessitatibus quas repudiandae quis itaque, exercitationem
            assumenda repellendus voluptatem! Nam rem quo fugiat sint repudiandae veniam, enim iste animi sunt dolore,
            rerum nostrum nesciunt deleniti corporis quae ratione eveniet cum tempora, molestiae repellendus. Ea nemo
            velit cum ut optio quidem iure distinctio voluptates nihil accusantium inventore consequuntur, laboriosam
            quia nam laborum labore at! Voluptatem at reiciendis odit asperiores nam quas veniam totam officiis.
            Molestias deserunt magni odio, esse, quod inventore vitae maxime laboriosam omnis, laborum sequi voluptas
            suscipit!"
          />
        </TextContainer>
        <ButtonContainer>
          <DefaultButton text="Aceitar" type="submit" />
          <DefaultButton
            text="Recusar"
            type="button"
            classname="bordered"
            onClick={() => {
              onReject();
              onClose();
            }}
          />
        </ButtonContainer>
      </Form>
    </Container>
  );
};
export default TermsOfUseModal;
