'use client';

import { Main, Paragraph, Ul } from './styles';

const TermsOfUsePageCandidate: React.FC = () => {
  return (
    <Main>
      <h1>Termos de Uso - Área do Candidato</h1>
      <h2>Última atualização: 01 de setembro de 2025</h2>
      <Paragraph>
        Bem-vindo à plataforma de recrutamento da Bikube! Ao criar uma conta e
        utilizar nossos serviços, você concorda com os seguintes Termos de Uso.{' '}
      </Paragraph>
      <section>
        <h3>1. Objeto do Serviço </h3>
        <Paragraph>
          A plataforma tem como objetivo conectar candidatos a oportunidades de
          emprego na Bikube e suas afiliadas. O serviço permite que você (o
          &ldquo;Candidato&ldquo;) crie um perfil, construa um currículo
          virtual, visualize vagas, se candidate e acompanhe o andamento de suas
          candidaturas.
        </Paragraph>
      </section>
      <section>
        <h3>2. Cadastro e Conta do Usuário</h3>
        <Paragraph>
          <strong>2.1.</strong> Para se candidatar às vagas, é necessário criar
          uma conta, fornecendo informações verdadeiras, exatas e atualizadas.
        </Paragraph>
        <Paragraph>
          <strong>2.2.</strong> Você é o único responsável pela segurança de sua
          senha e por todas as atividades que ocorrerem em sua conta.
        </Paragraph>
        <Paragraph>
          <strong>2.3.</strong> A Bikube não se responsabiliza por informações
          falsas ou imprecisas fornecidas por você em seu cadastro ou currículo.
        </Paragraph>
      </section>
      <section>
        <h3>3. Criação de Currículo e Candidatura</h3>
        <Paragraph>
          <strong>3.1.</strong> A candidatura a qualquer vaga só é permitida
          após o preenchimento completo do currículo virtual na plataforma.
        </Paragraph>
        <Paragraph>
          <strong>3.2.</strong> Ao se candidatar, você concorda que suas
          informações de perfil, competências, experiências e demais dados do
          currículo sejam analisados pela equipe de Recursos Humanos da Bikube.
        </Paragraph>
        <Paragraph>
          <strong>3.3.</strong> O sistema calculará uma pontuação de
          compatibilidade entre seu perfil e os requisitos da vaga. Essa
          pontuação é uma ferramenta de auxílio para o processo seletivo e não
          garante, por si só, a sua aprovação ou reprovação. A pontuação será
          visível para a equipe de Recursos Humanos para fins de triagem e
          classificação.
        </Paragraph>
      </section>
      <section>
        <h3>4. Comunicações</h3>
        <Paragraph>
          <strong>4.1.</strong> Ao se candidatar a uma vaga, você consente em
          receber comunicações por e-mail referentes à confirmação de sua
          candidatura, atualizações sobre o andamento do processo seletivo
          (avanço de etapas, reprovação) e outras notificações pertinentes.
        </Paragraph>
      </section>
      <section>
        <h3>5. Desistência e Encerramento do Processo</h3>
        <Paragraph>
          <strong>5.1.</strong> Você tem o direito de desistir de uma
          candidatura a qualquer momento, através da funcionalidade disponível
          na plataforma.
        </Paragraph>
        <Paragraph>
          <strong>5.2.</strong> A Bikube se reserva o direito de encerrar sua
          candidatura a qualquer momento, com ou sem justificativa,
          notificando-o da decisão.
        </Paragraph>
      </section>
      <section>
        <h3>6. Etapa de Contratação</h3>
        <Paragraph>
          <strong>6.1.</strong> Caso você avance para a etapa final de
          contratação, será solicitado o preenchimento de um formulário com
          dados adicionais necessários para os procedimentos admissionais. O
          fornecimento dessas informações é obrigatório para a conclusão da
          contratação.
        </Paragraph>
      </section>
      <section>
        <h3>7. Conduta do Usuário</h3>
        <Paragraph>É proibido utilizar a plataforma para: </Paragraph>
        <Ul>
          <li>
            a) Tentar obter acesso não autorizado a sistemas, dados ou contas de
            outros usuários.
          </li>
          <li>
            b) Transmitir qualquer conteúdo ilegal, fraudulento ou malicioso.
          </li>
          <li>c) Interferir no funcionamento normal da plataforma.</li>
        </Ul>
      </section>
      <section>
        <h3>8. Propriedade Intelectual</h3>
        <p>
          Todo o conteúdo da plataforma, incluindo logotipos, software e design,
          é propriedade da Bikube. O conteúdo que você insere (seus dados de
          currículo) permanece de sua propriedade, mas você nos concede uma
          licença para usar essas informações para os fins exclusivos do
          processo de recrutamento e seleção.
        </p>
      </section>
      <section>
        <h3>9. Alterações nos Termos</h3>
        <p>
          A Bikube pode alterar estes Termos de Uso a qualquer momento.
          Notificaremos sobre as mudanças significativas. O uso contínuo da
          plataforma após as alterações constitui sua aceitação dos novos
          termos.
        </p>
      </section>
      <section>
        <h3>10. Lei Aplicável</h3>
        <p>
          Estes termos serão regidos e interpretados de acordo com as leis da
          República Federativa do Brasil.
        </p>
      </section>
    </Main>
  );
};
export default TermsOfUsePageCandidate;
