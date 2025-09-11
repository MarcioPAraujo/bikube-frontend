export interface ICandidateDetailsResponse {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  github: string;
  cidade: string;
  estado: string;
  habilidades: Habilidade[];
  formacaoAcademica: FormacaoAcademica[];
  experiencias: Experiencia[];
  idiomas: Idioma[];
}

export interface Experiencia {
  id: number;
  empresa: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}

export interface FormacaoAcademica {
  id: number;
  instituicao: string;
  curso: string;
  situacao: string;
  dataInicio: string;
  dataFim: string;
}

export interface Habilidade {
  habilidade: string;
  tempoExperiencia: number;
}

export interface Idioma {
  idioma: string;
  nivel: string;
}
