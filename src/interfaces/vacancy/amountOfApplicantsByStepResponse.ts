export interface IAmountOfApplicantByStepResponse {
  etapas: Etapas;
}

export interface Etapas {
  TRIAGEM: number;
  DESISTENCIA: number;
  OFERTA: number;
  ENTREVISTA: number;
  FINALIZADO: number;
}
