import { Button, ButtonsContainer, Container, Title } from './formTitleStyles';

interface IFormTitleProps {
  title: string;
  onBack: VoidFunction;
  onNext?: VoidFunction;
  nextButtonText?: string;
}

/**
 * FormTitle component for candidate registration forms.
 *
 * This component displays the title of the current registration step and provides navigation buttons
 * to go back to the previous step or advance to the next step. It is designed to be used within
 * multi-step forms for candidate registration, ensuring a consistent header and navigation experience.
 *
 * Props:
 * - title: The title text for the current form step.
 * - onBack: Function called when the "Voltar" (Back) button is clicked.
 * - onNext: Optional function called when the "Avançar" (Next) button is clicked.
 * - nextButtonText: Optional custom text for the next button (defaults to "Avançar").
 *
 * Example usage:
 * ```tsx
 * <FormTitle
 *   title="Dados Pessoais"
 *   onBack={handleBack}
 *   onNext={handleNext}
 *   nextButtonText="Próximo"
 * />
 * ```
 *
 * @component
 */
const FormTitle: React.FC<IFormTitleProps> = ({ onBack, onNext, title, nextButtonText = 'Avançar' }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ButtonsContainer>
        <Button type="button" onClick={onBack} className="back">
          Voltar
        </Button>
        <Button type="submit" onClick={onNext} className="next">
          {nextButtonText}
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
export default FormTitle;
