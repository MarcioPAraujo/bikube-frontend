export interface IAnnouncementsResponse {
  id: number;
  funcionario: Funcionario;
  comunicado: Comunicado;
  visto: boolean;
}

export interface Comunicado {
  id: number;
  titulo: string;
  texto: string;
  datacriacao: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  data_nascimento: string;
  cpf: string;
  email: string;
  cargo: string;
  salario: number;
  contabancaria: string;
  dataentrada: string;
  datasaida: null;
  funcao: string;
  status: string;
  id_telefone: IDTelefone;
  idsetor: Idsetor;
  id_endereco: IDEndereco;
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

export interface IDEndereco {
  id: number;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
}

export interface IDTelefone {
  id: number;
  numero: string;
}

export interface Idsetor {
  id: number;
  nome: string;
}
