'use client';

import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { DataContainer, Header, ProfileContainer, UserInfo, UserName } from './styles';
import { Icons } from '@/components/Icons/Icons';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();
  const { user, logout } = useAuth();
  console.log('user', user);
  if (!user) {
    return null; // or a loading spinner
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
      {children}
    </div>
  );
};
export default Layout;
