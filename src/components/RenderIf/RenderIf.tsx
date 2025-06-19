/* eslint-disable react/jsx-no-useless-fragment */
interface RenderIfProps {
  children: React.ReactNode;
  isTrue?: boolean;
  isFalse?: boolean;
}
/**
 * This component conditionally renders its children based on the provided boolean props.
 *
 * @param React.ReactNode children - The content to render conditionally.
 * @param boolean isTrue - If true, the children will be rendered.
 * @param boolean isFalse - If false, the children will be rendered.
 *
 * @returns {React.ReactNode | null} - Returns the children if either isTrue is true or isFalse is false, otherwise returns null.
 */
const RenderIf: React.FC<RenderIfProps> = ({ children, isFalse, isTrue }) => {
  if (isTrue === true) {
    return <>{children}</>;
  }
  if (isFalse === false) {
    return <>{children}</>;
  }
  return null;
};
export default RenderIf;
