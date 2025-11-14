export interface ICandidateProfileEditBodyRequest {
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
  empresa: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}

export interface FormacaoAcademica {
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
