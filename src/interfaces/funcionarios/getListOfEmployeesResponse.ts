export interface IEmployeeResponse {
  id:                    string;
  nome:                  string;
  data_nascimento:       string;
  cpf:                   string;
  email:                 string;
  cargo:                 string;
  salario:               number;
  contabancaria:         string;
  dataentrada:           string;
  datasaida:             string;
  funcao:                string;
  idusuario:             Idusuario;
  id_telefone:           IDTelefone;
  id_setor:              IDSetor;
  id_endereco:           IDEndereco;
  password:              string;
  username:              string;
  authorities:           Authority[];
  accountNonExpired:     boolean;
  accountNonLocked:      boolean;
  credentialsNonExpired: boolean;
  enabled:               boolean;
}

export interface Authority {
  authority: string;
}

export interface IDEndereco {
  id:          number;
  cep:         string;
  logradouro:  string;
  bairro:      string;
  cidade:      string;
  estado:      string;
  numero:      string;
  complemento: string;
}

export interface IDSetor {
  id:   number;
  nome: string;
}

export interface IDTelefone {
  id:     number;
  numero: string;
}

export interface Idusuario {
  id:           string;
  registro:     string;
  senha:        string;
  status:       string;
  tentativas:   number;
  databloqueio: string;
}
