'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { DataContainer, Header, MainContainer, ProfileContainer, UserInfo, UserName } from './styles';
import { Icons } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  if (!user) {
    return <>{children}</>; // or a loading spinner
  }

  return (
    <div>
      <Header>
        <div>
          <Image src="/images/Logo.png" alt="Logo" width={215} height={90} quality={100} priority />
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
