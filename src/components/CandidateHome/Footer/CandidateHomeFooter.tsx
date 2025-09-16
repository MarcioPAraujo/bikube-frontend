import Image from 'next/image';
import Link from 'next/link';
import { Footer, Topic, TopicsWrapper } from './styles.';

const topics = [
  {
    title: 'Contato',
    data: ['bikube@email.com', '+55 11 99999-9999'],
  },
  {
    title: 'CNPJ',
    data: ['00.000.000/0001-00'],
  },
  {
    title: 'Institucional',
    data: ['Termos de uso', 'Políticas de privacidade'],
    links: [
      '/area-do-candidato/termos-de-uso',
      '/area-do-candidato/politicas-de-privacidade',
    ],
  },
  {
    title: 'Endereço',
    data: ['Rua Exemplo, 123 - São Paulo, SP', 'CEP: 00000-000'],
  },
];

const CandidateHomeFooter: React.FC = () => {
  return (
    <Footer>
      <Image
        alt="bikube logo"
        src="/images/login-logo-white.png"
        width={150}
        height={80}
      />
      <TopicsWrapper>
        {topics.map(topic => {
          if (topic.title === 'Institucional') {
            return (
              <Topic key={topic.title}>
                <h3>{topic.title}</h3>
                <ul>
                  {topic.data.map((item, idx) => (
                    <li key={item}>
                      <Link href={topic.links ? topic.links[idx] : '#'}>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Topic>
            );
          }
          return (
            <Topic key={topic.title}>
              <h3>{topic.title}</h3>
              <ul>
                {topic.data.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Topic>
          );
        })}
      </TopicsWrapper>
    </Footer>
  );
};
export default CandidateHomeFooter;
