import { Paragraph, Ul, Wrapper } from './styles';

const EmployeePrivacyPolicy: React.FC = () => {
  return (
    <Wrapper>
      <h1>Política de Privacidade - Área do Funcionário</h1>
      <h2>Última atualização: 01 de setembro de 2025</h2>
      <Paragraph>
        A Bikube está comprometida em proteger a privacidade e os dados pessoais
        de seus funcionários. Esta política descreve o tratamento de dados
        realizado através do nosso sistema administrativo interno, em
        conformidade com a Lei Geral de Proteção de Dados (LGPD).
      </Paragraph>
      <section>
        <h3>1. Dados Pessoais Tratados no Sistema</h3>
        <Paragraph>
          O sistema trata os seguintes dados pessoais do funcionário:
        </Paragraph>
        <Ul>
          <li>
            <strong>Dados de Identificação e Contratuais:</strong> Nome
            completo, cargo, departamento, registro de funcionário, e dados
            transferidos do processo de candidatura (RG, CPF, endereço, etc.).
          </li>
          <li>
            <strong>Dados de Frequência e Jornada de Trabalho:</strong>{' '}
            Registros de entrada e saída (ponto), espelho de ponto,
            justificativas para correções.
          </li>
          <li>
            <strong>Dados de Solicitações Administrativas:</strong> Pedidos de
            férias, status de aprovação, e outras solicitações feitas através do
            sistema.
          </li>
          <li>
            <strong>Dados de Auditoria (para usuários administrativos):</strong>{' '}
            Logs de ações realizadas no sistema por usuários com permissões
            elevadas, para fins de segurança e conformidade.
          </li>
        </Ul>
      </section>
      <section>
        <h3>2. Finalidade do Tratamento dos Dados</h3>
        <Paragraph>
          Seus dados são tratados para as seguintes finalidades essenciais à
          relação de trabalho:
        </Paragraph>
        <Ul>
          <li>
            a) Cumprimento do Contrato de Trabalho: Gestão de jornada, cálculo
            de folha de pagamento, controle de férias.
          </li>
          <li>
            b) Cumprimento de Obrigações Legais e Regulatórias: Atender às
            exigências da legislação trabalhista, previdenciária e fiscal (ex:
            controle de ponto, eSocial).
          </li>
          <li>
            c) Administração Interna: Gerenciar solicitações de férias, realizar
            comunicações internas e permitir a gestão de equipes pelos setores
            autorizados.
          </li>
          <li>
            d) Segurança e Auditoria: Monitorar o acesso e as ações no sistema
            para garantir a segurança da informação e a integridade dos dados.
          </li>
        </Ul>
      </section>
      <section>
        <h3>3. Compartilhamento de Dados</h3>
        <Paragraph>
          O acesso aos seus dados é restrito a setores que necessitam da
          informação para realizar suas funções (ex: Recursos Humanos,
          Departamento Pessoal, seu gestor direto). Poderemos compartilhar seus
          dados com terceiros apenas quando necessário para cumprir obrigações
          legais (ex: órgãos governamentais) ou para a execução de serviços
          contratados (ex: empresa de contabilidade, operadora de benefícios),
          sempre em conformidade com a LGPD.
        </Paragraph>
      </section>
      <section>
        <h3>4. Armazenamento, Retenção e Exclusão de Dados</h3>
        <Paragraph>
          <strong>4.1.</strong> Seus dados são armazenados em ambiente seguro,
          com medidas de proteção adequadas.
        </Paragraph>
        <Paragraph>
          <strong>4.2.</strong> Os dados serão mantidos durante toda a vigência
          do contrato de trabalho.
        </Paragraph>
        <Paragraph>
          <strong>4.3.</strong> Após a sua demissão, os dados serão mantidos
          armazenados pelo período de 5 anos para o cumprimento de obrigações
          legais e regulatórias (prazos trabalhistas, processos trabalhistas,
          fiscais e previdenciários). Após o decurso desses prazos, os dados
          serão excluídos de forma segura.
        </Paragraph>
      </section>
      <section>
        <h3>5. Seus Direitos como Titular dos Dados</h3>
        <Paragraph>
          Como funcionário, você tem o direito de solicitar o acesso e a
          correção de seus dados pessoais. O direito à eliminação dos dados será
          atendido, respeitando-se os prazos de retenção obrigatória por lei,
          conforme descrito no item 4.3.
        </Paragraph>
      </section>
      <section>
        <h3>6. Contato</h3>
        <Paragraph>
          Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de
          seus dados, entre em contato com o setor de Recursos Humanos ou com
          nosso Encarregado de Proteção de Dados (DPO) pelo e-mail: [
          @bikube.com.br].
        </Paragraph>
      </section>
    </Wrapper>
  );
};
export default EmployeePrivacyPolicy;
