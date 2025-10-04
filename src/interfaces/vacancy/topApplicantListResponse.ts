export interface ITopApplicantsListResponse {
  candidato: Candidato;
  pontuacao: number;
}

export interface Candidato {
  id: number;
  nome: string;
  email: string;
  estado: string;
  cidade: string;
  telefone: string;
  linkedin: string;
  github: string;
  aceitouTermo: boolean;
  formacoes: Formacao[];
  experiencias: Experiencia[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface Experiencia {
  id: number;
  empresa: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}
export interface Formacao {
  id: number;
  instituicao: string;
  curso: string;
  situacao: string;
  dataInicio: string;
  dataFim: string;
}
