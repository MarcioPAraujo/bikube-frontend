import { Paragraph, Ul, Wrapper } from './styles';

const EmployeeTermsOfUse: React.FC = () => {
  return (
    <Wrapper>
      <h1>Termos de Uso - Área do Funcionário</h1>
      <h2>Última atualização: 01 de setembro de 2025</h2>
      <Paragraph>
        Este documento estabelece os Termos de Uso do sistema administrativo
        interno da Bikube (&ldquo;Sistema&rdquo;) para todos os funcionários,
        colaboradores e afiliados autorizados (&ldquo;Usuário&ldquo;).
      </Paragraph>
      <section>
        <h3>1. Objeto e Acesso ao Sistema </h3>
        <Paragraph>
          <strong>1.1.</strong> O Sistema é uma ferramenta corporativa destinada
          à gestão de atividades administrativas de Recursos Humanos, como
          registro de ponto, consulta de espelho de ponto, solicitação de férias
          e comunicação interna.
        </Paragraph>
        <Paragraph>
          <strong>1.2.</strong> O acesso é pessoal, único e concedido pela
          Bikube após a sua contratação. Suas credenciais (registro e senha) são
          de sua exclusiva responsabilidade.
        </Paragraph>
      </section>
      <section>
        <h3>2. Primeiro Acesso e Segurança da Senha</h3>
        <Paragraph>
          <strong>2.1.</strong> Em seu primeiro acesso, será obrigatória a
          alteração da senha provisória fornecida. A nova senha deverá cumprir
          os requisitos de segurança informados na tela de alteração.
        </Paragraph>
        <Paragraph>
          <strong>2.2.</strong> O Usuário é responsável por manter a
          confidencialidade de sua senha e por todas as atividades realizadas
          através de sua conta.
        </Paragraph>
      </section>
      <section>
        <h3>3. Uso Aceitável do Sistema</h3>
        <Paragraph>
          <strong>3.1.</strong> O Usuário concorda em utilizar o Sistema
          exclusivamente para os fins profissionais e administrativos para os
          quais foi projetado.
        </Paragraph>
        <Paragraph>
          <strong>3.2.</strong> É estritamente proibido:
        </Paragraph>
        <Ul>
          <li>a) Compartilhar suas credenciais de acesso com terceiros. </li>
          <li>
            b) Utilizar o Sistema para fins ilegais, fraudulentos ou que violem
            as políticas internas da Bikube.
          </li>
          <li>
            c) Manipular ou tentar manipular registros de ponto ou outras
            informações de forma indevida.
          </li>
        </Ul>
      </section>
      <section>
        <h3>4. Níveis de Acesso e Responsabilidades</h3>
        <Paragraph>
          <strong>4.1.</strong> O acesso às funcionalidades do Sistema é
          segmentado por cargo e função.
        </Paragraph>
        <Paragraph>
          <strong>4.2.</strong> Usuários com níveis de acesso elevados (Recursos
          Humanos, Departamento Pessoal, Administradores) possuem
          responsabilidade adicional sobre os dados que acessam e manipulam,
          devendo sempre agir em conformidade com as políticas de segurança e
          privacidade da empresa e com a legislação vigente. Todas as ações
          administrativas (criação de vagas, edição de dados de funcionários,
          etc.) são registradas em logs de auditoria.
        </Paragraph>
      </section>
      <section>
        <h3>5. Funcionalidades e Registros </h3>
        <Paragraph>
          <strong>5.1.</strong> Ponto: O registro de ponto (&ldquo;bater o
          ponto&ldquo;) através do sistema é um registro oficial de sua jornada
          de trabalho. Relatórios de problemas com o espelho de ponto devem ser
          justificados e serão analisados pelo Recursos Humanos.
        </Paragraph>
        <Paragraph>
          <strong>5.2.</strong> Férias: As solicitações de férias serão
          submetidas à aprovação do setor de Recursos Humanos e/ou gestor
          direto.
        </Paragraph>
        <Paragraph>
          <strong>5.3.</strong> Recados: A tela de recados é um canal de
          comunicação oficial. O Usuário é responsável por verificar as
          notificações recebidas.
        </Paragraph>
      </section>
      <section>
        <h3>6. Encerramento do Acesso</h3>
        <Paragraph>
          O acesso ao Sistema será revogado imediatamente após a rescisão do
          contrato de trabalho com a Bikube.
        </Paragraph>
      </section>
      <section>
        <h3>7. Lei Aplicável</h3>
        <Paragraph>
          Estes termos são regidos pelas políticas internas da Bikube e pela
          legislação trabalhista e cível da República Federativa do Brasil.
        </Paragraph>
      </section>
    </Wrapper>
  );
};
export default EmployeeTermsOfUse;
