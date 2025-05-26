import Image from 'next/image';
import Link from 'next/link';
import { NavbarStyled, OpenCloseButton } from './styles';
import { Icons } from '../Icons/Icons';
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <NavbarStyled className={isOpen ? 'open' : 'close'}>
      <Image src="/images/White-Logo.png" alt="Logo" width={200} height={95} quality={100} priority />
      <ul>
        <li>
          <Link href="/setores">Setores</Link>
        </li>
      </ul>
      <OpenCloseButton type="button" onClick={() => setIsOpen(!isOpen)} className={isOpen ? 'open' : 'close'}>
        <Icons.CaretRight color="white" />
      </OpenCloseButton>
    </NavbarStyled>
  );
};
