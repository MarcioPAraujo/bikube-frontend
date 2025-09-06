/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { Icons } from '@/components/Icons/Icons';
import { Navbar } from '@/components/Navbar';
import {
  DataContainer,
  Header,
  MainContainer,
  ProfileContainer,
  UserInfo,
  UserName,
} from './styles';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div>
      <Header>
        <div>
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={215}
            height={90}
            quality={100}
            priority
          />
        </div>
        <button type="button" onClick={logout}>
          logout
        </button>
        <DataContainer>
          <UserInfo>
            <UserName>{user?.nome}</UserName>
            <p>
              Função: <strong>{user?.role}</strong>
            </p>
          </UserInfo>
          <ProfileContainer>
            <Icons.Person />
          </ProfileContainer>
        </DataContainer>
      </Header>
      <Navbar />
      <MainContainer>{children}</MainContainer>
    </div>
  );
};
export default Layout;
