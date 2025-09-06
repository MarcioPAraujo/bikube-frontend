import { Mulish } from 'next/font/google';
import { Icon } from '../Icons/Icons';
import { H1, LogoContainer } from './styles';

const mulish = Mulish({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const Logo = () => {
  return (
    <LogoContainer className="logo">
      <Icon name="Logo" />
      <H1 className={mulish.className}>Bikube</H1>
    </LogoContainer>
  );
};
