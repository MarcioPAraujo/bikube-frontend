'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { DataContainer, Header, ProfileContainer, UserInfo, UserName } from './styles';
import { Icons } from '@/components/Icons/Icons';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAuth();
  console.log('user', user);
  return (
    <div>
      <Header>
        <div>
          <Image src="/images/Logo.png" alt="Logo" width={215} height={90} quality={100} priority />
        </div>
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
      {children}
    </div>
  );
};
export default Layout;
