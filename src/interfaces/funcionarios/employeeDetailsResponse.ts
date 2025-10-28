export interface IEmployeeDetailsResponse {
  id: string;
  nome: string;
  data_nascimento: string;
  cpf: string;
  email: string;
  cargo: string;
  salario: number;
  contabancaria: string;
  dataentrada: string;
  datasaida: string | null;
  funcao: string;
  status: string;
  feriasDisponiveis: number;
  fracoesDisponiveis: number;
  periodo14dias: boolean;
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
