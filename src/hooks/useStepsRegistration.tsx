import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { AcedemicDataSchemaType } from '@/validation/candidateRegister/AcademicData';
import { CredentialsSchemaType } from '@/validation/candidateRegister/CredentialSchema';
import { PersonalDataSchemaType } from '@/validation/candidateRegister/PersonalDataSchema';
import { ProfessionalSchemaType } from '@/validation/candidateRegister/ProfessionalExperience';
import { SkillsSchemaType } from '@/validation/candidateRegister/SkillSchema';
import { redirect, usePathname } from 'next/navigation';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type StepType<T> = {
  stepNumber: number;
  formData: T | null;
  pathname: string;
};

interface IStepsValues {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;

  setStep1: Dispatch<SetStateAction<StepType<CredentialsSchemaType>>>;
  setStep2: Dispatch<SetStateAction<StepType<PersonalDataSchemaType>>>;
  setStep3: Dispatch<SetStateAction<StepType<AcedemicDataSchemaType>>>;
  setStep4: Dispatch<SetStateAction<StepType<ProfessionalSchemaType>>>;
  setStep5: Dispatch<SetStateAction<StepType<SkillsSchemaType>>>;

  step1: StepType<CredentialsSchemaType>;
  step2: StepType<PersonalDataSchemaType>;
  step3: StepType<AcedemicDataSchemaType>;
  step4: StepType<ProfessionalSchemaType>;
  step5: StepType<SkillsSchemaType>;
}

interface IChildren {
  children: ReactNode;
}

const basePath = '/candidato-registro/';
const stepsPaths: string[] = [
  `${basePath}credenciais-de-acesso`,
  `${basePath}dados-pessoais`,
  `${basePath}formacao-academica`,
  `${basePath}experiencia-profissional`,
  `${basePath}habilidades`,
];

const setInitialStepState = (stepNumber: number) => ({
  stepNumber,
  pathname: stepsPaths[stepNumber - 1],
  formData: null,
});

const StepsFormContext = createContext({} as IStepsValues);

export const StepsRegistrationProvider: FC<IChildren> = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [step1, setStep1] = useState<StepType<CredentialsSchemaType>>(setInitialStepState(1));
  const [step2, setStep2] = useState<StepType<PersonalDataSchemaType>>(setInitialStepState(2));
  const [step3, setStep3] = useState<StepType<AcedemicDataSchemaType>>(setInitialStepState(3));
  const [step4, setStep4] = useState<StepType<ProfessionalSchemaType>>(setInitialStepState(4));
  const [step5, setStep5] = useState<StepType<SkillsSchemaType>>(setInitialStepState(5));

  useEffect(() => {
    const storedStep1 = sessionStorage.getItem(SESSION_STORAGE_KEYS.step1);
    const storedStep2 = sessionStorage.getItem(SESSION_STORAGE_KEYS.step2);
    const storedStep3 = sessionStorage.getItem(SESSION_STORAGE_KEYS.step3);
    const storedStep4 = sessionStorage.getItem(SESSION_STORAGE_KEYS.step4);
    const storedStep5 = sessionStorage.getItem(SESSION_STORAGE_KEYS.step5);

    if (storedStep1) {
      setStep1(prev => ({
        ...prev,
        formData: JSON.parse(storedStep1),
      }));
    }

    if (storedStep2) {
      setStep2(prev => ({
        ...prev,
        formData: JSON.parse(storedStep2),
      }));
    }

    if (storedStep3) {
      setStep3(prev => ({
        ...prev,
        formData: JSON.parse(storedStep3),
      }));
    }

    if (storedStep4) {
      setStep4(prev => ({
        ...prev,
        formData: JSON.parse(storedStep4),
      }));
    }

    if (storedStep5) {
      setStep5(prev => ({
        ...prev,
        formData: JSON.parse(storedStep5),
      }));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const steps = [step1, step2, step3, step4, step5];

    // Find the index of the first incomplete step
    const firstIncompleteIndex = steps.findIndex(step => step.formData === null);

    // If all steps are complete, allow navigation anywhere
    if (firstIncompleteIndex === -1) return;

    // If trying to access a step after the first incomplete, redirect to the first incomplete
    if (currentStep - 1 > firstIncompleteIndex) {
      redirect(steps[firstIncompleteIndex].pathname);
    }
  }, [currentStep, step1, step2, step3, step4, step5]);

  if (isLoading) return null;

  if (!pathname.startsWith(basePath)) {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.step1);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.step2);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.step3);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.step4);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.step5);

    setStep1(setInitialStepState(1));
    setStep2(setInitialStepState(2));
    setStep3(setInitialStepState(3));
    setStep4(setInitialStepState(4));
    setStep5(setInitialStepState(5));

    // Reset current step to 1 if the pathname is not a valid step
    setCurrentStep(1);
  }

  const value: IStepsValues = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      setStep1,
      setStep2,
      setStep3,
      setStep4,
      setStep5,
      step1,
      step2,
      step3,
      step4,
      step5,
    }),
    [step1, step2, step3, step4, step5, setStep1, setStep2, setStep3, setStep4, setStep5, currentStep, setCurrentStep],
  );

  return <StepsFormContext.Provider value={value}>{children}</StepsFormContext.Provider>;
};

export const useStepsRegistration = (): IStepsValues => {
  const context = useContext(StepsFormContext);
  if (!context) {
    throw new Error('The useStepsRegistration must be within a StepsFormContext provider');
  }
  return context;
};
