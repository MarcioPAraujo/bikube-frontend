import { DefaultUl, Paragraph, Ul, Wrapper } from './styles';

const CandidatePrivacyPolicy: React.FC = () => {
  return (
    <Wrapper>
      <h1>Políticas de Privacidade - Área do Candidato</h1>
      <h2>Última atualização: 01 de setembro de 2025</h2>
      <Paragraph>
        A sua privacidade é fundamental para a Bikube. Esta Política de
        Privacidade descreve como coletamos, usamos, armazenamos e protegemos
        seus dados pessoais, em conformidade com a Lei Geral de Proteção de
        Dados (Lei nº 13.709/2018).
      </Paragraph>
      <section>
        <h3>1. Dados Pessoais Coletados</h3>
        <Paragraph>Coletamos os seguintes tipos de dados: </Paragraph>
        <DefaultUl>
          <li>
            <strong>Dados de Cadastro:</strong> Nome completo, e-mail, senha de
            acesso.
          </li>
          <li>
            <strong>Dados do Currículo Virtual:</strong> Experiência
            profissional, formação acadêmica, competências, habilidades, cursos,
            projetos e outras informações que você optar por fornecer.
          </li>
          <li>
            <strong>Dados do Formulário de Contratação:</strong> Caso avance no
            processo, coletaremos dados necessários para a admissão, como RG,
            CPF, endereço, dados bancários, etc.
          </li>
          <li>
            <strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador,
            logs de acesso e cookies para melhorar a sua experiência.
          </li>
        </DefaultUl>
      </section>
      <section>
        <h3>2. Finalidade do Tratamento dos Dados</h3>
        <Paragraph>
          Utilizamos seus dados para as seguintes finalidades:{' '}
        </Paragraph>
        <Ul>
          <li>
            a) Gerenciar e administrar sua participação nos processos seletivos.
          </li>
          <li>
            b) Calcular sua compatibilidade e pontuação para as vagas aplicadas.
          </li>
          <li>
            c) Comunicar-nos com você sobre o status de suas candidaturas.
          </li>
          <li>d) Cumprir obrigações legais e regulatórias. </li>
          <li>e) Realizar a sua contratação, caso seja aprovado.</li>
          <li>
            f) Gerar dados estatísticos e anônimos para aprimoramento do nosso
            processo de recrutamento.
          </li>
        </Ul>
      </section>
      <section>
        <h3>3. Compartilhamento de Dados</h3>
        <Paragraph>
          Seus dados pessoais serão acessados apenas por profissionais
          autorizados do setor de Recursos Humanos e gestores envolvidos no
          processo seletivo da vaga para a qual você se candidatou. Não
          compartilhamos seus dados com terceiros para fins de marketing.
        </Paragraph>
      </section>
      <section>
        <h3>4. Armazenamento e Segurança dos Dados</h3>
        <Paragraph>
          Seus dados são armazenados em servidores seguros, e adotamos medidas
          técnicas e administrativas para protegê-los contra acesso não
          autorizado, perda ou destruição. Seus dados serão mantidos em nosso
          banco de dados enquanto sua conta estiver ativa ou pelo tempo
          necessário para cumprir com os propósitos para os quais foram
          coletados.
        </Paragraph>
      </section>
      <section>
        <h3>5. Seus Direitos como Titular dos Dados</h3>
        <Paragraph>Você, como titular dos dados, tem o direito de: </Paragraph>
        <DefaultUl>
          <li>
            <strong>Acessar</strong> seus dados a qualquer momento.
          </li>
          <li>
            <strong>Corrigir</strong> informações incompletas, inexatas ou
            desatualizadas.
          </li>
          <li>
            <strong>Solicitar a exclusão</strong> de sua conta e de seus dados
            pessoais através da funcionalidade em seu perfil. A exclusão será
            realizada, exceto nos casos em que a lei exija a manutenção dos
            dados.
          </li>
          <li>
            <strong>Revogar o consentimento</strong> para o tratamento dos
            dados.
          </li>
        </DefaultUl>
      </section>
      <section>
        <h3>6. Transferência de Dados em Caso de Contratação</h3>
        <Paragraph>
          Caso você seja contratado, os dados pessoais coletados durante o
          processo seletivo serão transferidos para o seu novo cadastro de
          funcionário, passando a ser regidos pela Política de Privacidade
          interna de Funcionários.
        </Paragraph>
      </section>
      <section>
        <h3>7. Contato</h3>
        <Paragraph>
          Em caso de dúvidas sobre esta política, entre em contato com nosso
          Encarregado de Proteção de Dados (DPO) pelo e-mail: [ @bikube.com.br].
        </Paragraph>
      </section>
    </Wrapper>
  );
};
export default CandidatePrivacyPolicy;
