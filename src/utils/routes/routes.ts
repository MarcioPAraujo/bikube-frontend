export const CandidatePublicRoutes = {
  LOGIN: '/cadidato-login',
  EMAIL_VERIFICATION: '/cadidato-email',
  CODE_VERIFICATION: '/cadidato-codigo',
  PASSWORD_RESET: '/cadidato-redefinir-senha',
  REGISTER: {
    STEP1: '/cadidato-registro/credenciais-de-acesso',
    STEP1_EMAIL: '/cadidato-registro/credenciais-de-acesso/verificar-email',
    STEP2: '/cadidato-registro/dados-pessoais',
    STEP3: '/cadidato-registro/formacao-academica',
    STEP4: '/cadidato-registro/experiencia-profissional',
    STEP5: '/cadidato-registro/habilidades',
  },
} as const;

export const EmployeePublicRoutes = {
  LOGIN: '/',
  EMAIL_VERIFICATION: '/email',
  CODE_VERIFICATION: '/codigo',
  PASSWORD_RESET: '/redefinir-senha',
} as const;
