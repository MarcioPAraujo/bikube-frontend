/* eslint-disable react/jsx-no-useless-fragment */
interface RenderIfProps {
  children: React.ReactNode;
  isTrue?: boolean;
  isFalse?: boolean;
}
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
