export interface IPendingVacationsListResponse {
  id: number;
  funcionario: Funcionario;
  dataInicio: Date;
  dataFim: Date;
  status: string;
  setorfuncionario: string;
  motivoRecusa: null | string;
  atualizadoPor: null | string;
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
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
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
