import Image from 'next/image';
import Link from 'next/link';
import { LI, NavbarStyled, OpenCloseButton, UL } from './styles';
import { Icons } from '../Icons/Icons';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import RenderIf from '../RenderIf/RenderIf';

interface Tab {
  name: string;
  url: string;
  allowedRoles: string[];
  baseUrl: string;
}
const accessLevel = {
  none: ['ADMIN', 'RH', 'FUNCIONARIO'],
  medium: ['ADMIN', 'RH'],
  high: ['ADMIN'],
};
const tabs: Tab[] = [
  {
    name: 'Home',
    url: '/home',
    allowedRoles: accessLevel.none,
    baseUrl: '/home',
  },
  {
    name: 'Setores',
    url: '/setores',
    allowedRoles: accessLevel.medium,
    baseUrl: '/setores',
  },
  {
    name: 'Funcionários',
    url: '/funcionarios',
    allowedRoles: accessLevel.medium,
    baseUrl: '/funcionarios',
  },
  {
    name: 'Relatórios',
    url: '/relatorios',
    allowedRoles: accessLevel.high,
    baseUrl: '/relatorios',
  },
  {
    name: 'Comunicados',
    url: '/comunicados',
    allowedRoles: accessLevel.none,
    baseUrl: '/comunicados',
  },
  {
    name: 'Minhas informações',
    url: '/minhas-informacoes',
    allowedRoles: accessLevel.none,
    baseUrl: '/minhas-informacoes',
  },
];

export const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isSelected = (tab: Tab) => {
    return pathname.startsWith(tab.baseUrl);
  };

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  return (
    <NavbarStyled className={isOpen ? 'open' : 'close'} ref={navbarRef}>
      <Image src="/images/White-Logo.png" alt="Logo" width={200} height={95} quality={100} priority />
      <UL>
        {tabs.map(tab => (
          <RenderIf isTrue={tab.allowedRoles.includes(user?.role || '')} key={tab.name}>
            <LI key={tab.name} className={isSelected(tab) ? 'selected' : ''}>
              <Link href={tab.url} className="nav-link">
                {tab.name}
              </Link>
            </LI>
          </RenderIf>
        ))}
      </UL>
      <OpenCloseButton type="button" onClick={() => setIsOpen(!isOpen)} className={isOpen ? 'open' : 'close'}>
        <Icons.CaretRight color="white" />
      </OpenCloseButton>
    </NavbarStyled>
  );
};
