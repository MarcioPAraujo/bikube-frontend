import { FC } from 'react';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import CandidateTermsOfUse from '@/components/terms/CandidateTermsOfUse/CandidateTermsOfUse';
import CandidatePrivacyPolicy from '@/components/terms/CandidatePrivacyPolicy/CandidatePrivacyPolicy';
import EmployeeTermsOfUse from '@/components/terms/EmployeeTermsOfUse/EmployeeTermsOfUse';
import EmployeePrivacyPolicy from '@/components/terms/EmployeePrivacyPolicy/EmployeePrivacyPolicy';
import {
  BlurBackground,
  ButtonContainer,
  Container,
  Form,
  TextContainer,
  Title,
} from './styles';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  type: 'candidate' | 'employee';
}
const TermsOfUseModal: FC<IProps> = ({ isOpen, onClose, onSubmit, type }) => {
  const isCandidate = type === 'candidate';
  const isEmployee = type === 'employee';

  if (!isOpen) return null;
  return (
    <Container>
      <BlurBackground />
      <Form onSubmit={onSubmit}>
        <Title>Termos de uso e Políticas de Privacidade</Title>
        <TextContainer>
          {isCandidate && (
            <>
              <CandidateTermsOfUse />
              <CandidatePrivacyPolicy />
            </>
          )}
          {isEmployee && (
            <>
              <EmployeeTermsOfUse />
              <EmployeePrivacyPolicy />
            </>
          )}
        </TextContainer>
        <ButtonContainer>
          <DefaultButton text="Aceitar" type="submit" />
          <DefaultButton
            text="Recusar"
            type="button"
            classname="bordered"
            onClick={onClose}
          />
        </ButtonContainer>
      </Form>
    </Container>
  );
};
export default TermsOfUseModal;
