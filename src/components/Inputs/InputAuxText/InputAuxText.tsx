/* eslint-disable max-len */
import { Paragraph } from './inputAuxtextStyles';

type Variant = 'NONE' | 'ERROR-MESSAGE';
interface IInputAuxTextProps {
  text: string | undefined;
  left?: string;
  bottom?: string;
  color?: string;
  fontSize?: string;
  variant?: Variant;
}
/**
 * Its parent component should be positioned relative to ensure the absolute positioning works correctly.
 *
 * Default bottom: -1.5rem;
 */
const InputAuxTextProps: React.FC<IInputAuxTextProps> = ({
  text,
  color,
  fontSize,
  left,
  bottom,
  variant = 'NONE',
}) => {
  const styleProps = {
    text,
    color,
    fontSize,
    left,
    bottom,
  };

  if (!text) return null;
  return (
    <Paragraph style={styleProps} className={variant}>
      {text}
    </Paragraph>
  );
};
export default InputAuxTextProps;
