# Front end - Human Resource Information System - Bikube

Este prjeto é parte do meu trabalho de conclusão de curso, trata- se de um sistema RH. Este deverá conter as prinipais funcionalidades de um sistema RH, como contratação de colaboradores, recrutamento e seleção, administração de setores, folha de pagamento e gestão de escala de trabalho.
Na presente versão (maio - 2025), apenas o sistema de autenticação está implementado.

## Sistema Authenticação:

- Uso de roles para controlar acesso a páginas especificas;
- Proteção simples contra ataques de força bruta, ao impedir multiplas tentativas de login incorreto;
- Uso de token para em requisições para controle de acesso a recursos do ssitema;
- Armazenamento de credenciais no local storage e session storage, para ajudar na validação de autenticação;

O controle de autenticação é feito majoritariamente pelo hook chamado useAuth, uma vez com o usuário logado ele pega as credenciais do local storage ou session storage para determinar quais rotas do diretório app, que são as rotas da aplicação frontend, aquele usuário pode ou não acessar com base na role que ele tem, além disso ele fornece um contexto para que toda as páginas estão inseridas nesse contexto logo toda a lógia contida nele está encapsulando as páginas, por se tratar de um contexto ele fonrce funcionalidades para estas páginas inseridas no seu contexto, como a função logout, que vai fazer o usuário sair da aplicação;

## Tecnologias Usadas:

- O projeto foi desenvolvido com a biblioteca React usando o framework NextJs com typescript;
- Estilização de páginas feito com Styled-components;
- Validação de formulários usando yup;
- Requisições feitas usando axios;
- React Toastify para exibir mensagens de erros nas requsições como tentativa de login incorreta;
- React tanstack query para fazer requisições GET nas listagens de auditoria, lista de setores e listagem de funcionários;

## Como executar o projeto localmente:

### Requsistos: instalar yarn, gerenciador de dependências

- baixando o projeto localmente através deste repositório, você poderá abri-lo em uma IDE (Integrated DevelopmentEnvironment).
- no terminal CLI (Command line interface) você terá de usar o seguinte comando para baixar as dependêcnias listadas no package.json _yarn install_ pois o gerenciador de pacotes usado foi o yarn;
- baixado as dependências você pode executar os comandos de scripts listados no _package.json_:
  - ### yarn dev - para executar o projeto, isto irá permitir que você possa vê-lo no navegador na porta 3000, para propositos de desenvolvimento
  - ### yarn build - compila o projeto, usado para verificação de erros;
  - ### yarn lint - para verifcação de erros de estilização do código, para manter um padrão de estruturação do código;
  - ## yarn start - o projeto será inicializado em modo de produção;
