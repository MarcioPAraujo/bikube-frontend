export interface IVacancyBodyRequest {
  titulo: string;
  modelo: string;
  descricao: string;
  tipoContrato: string;
  localizacao: string;
  informacoes: string;
  palavrasChave: string;
  nivel: string;
  habilidades: Habilidade[];
}

export interface Habilidade {
  habilidade: string;
  peso: number;
}
