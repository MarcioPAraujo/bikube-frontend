import { SubmitButton } from "./styles";

type ButtonProps = {
  text: string;
  onClick?: VoidFunction;
  disabled?: boolean;
};
export function Button(props: ButtonProps) {
  const { text, onClick, disabled } = props;
  return (
    <SubmitButton type="submit" onClick={onClick} disabled={disabled}>
      {text}
    </SubmitButton>
  );
}
