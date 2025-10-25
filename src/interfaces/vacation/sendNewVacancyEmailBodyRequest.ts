import { ICandidateBySkillsResponse } from '../candidate/candidateySkillsresponse';

export interface ISendNewVacancyEmailBodyRequest {
  tituloVaga: string;
  candidatos: ICandidateBySkillsResponse[];
}
