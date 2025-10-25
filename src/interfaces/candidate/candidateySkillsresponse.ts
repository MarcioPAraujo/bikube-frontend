export interface ICandidateBySkillsResponse {
  id: number;
  nome: string;
  email: string;
  estado: string;
  cidade: string;
  telefone: string;
  linkedin: string;
  github: string;
  aceitouTermo: boolean;
  formacoes: Formacoe[];
  experiencias: Experiencia[];
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

export interface Experiencia {
  id: number;
  empresa: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}

export interface Formacoe {
  id: number;
  instituicao: string;
  curso: string;
  situacao: string;
  dataInicio: string;
  dataFim: string;
}
