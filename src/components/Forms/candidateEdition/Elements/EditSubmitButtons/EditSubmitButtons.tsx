import { ButtonsContainer, CancelButton, SubmitButton } from './editSubmitButtonsStyles';
interface ISubmitButton {
  labelText: string;
  disabled: boolean;
}
interface ICancelButton {
  labelText: string;
  onClick: () => void;
  disabled?: boolean;
}
interface EditSubmitButtonProps {
  submitButton: ISubmitButton;
  cancelButton: ICancelButton;
}
const EditSubmitButtons: React.FC<EditSubmitButtonProps> = ({ submitButton, cancelButton }) => {
  return (
    <ButtonsContainer>
      <CancelButton type="button" onClick={cancelButton.onClick} disabled={cancelButton.disabled}>
        {cancelButton.labelText}
      </CancelButton>
      <SubmitButton type="submit" disabled={submitButton.disabled}>
        {submitButton.labelText}
      </SubmitButton>
    </ButtonsContainer>
  );
};
export default EditSubmitButtons;
