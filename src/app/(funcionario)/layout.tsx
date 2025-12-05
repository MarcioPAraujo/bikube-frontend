/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import AuthProvider, { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { Icon } from '@/components/Icons/Icons';
import { Navbar } from '@/components/Navbar';
import { SlLogout } from 'react-icons/sl';
import { useState } from 'react';
import WarningModal from '@/components/modals/WarningModal/WarningModal';
import {
  ActionsContainer,
  DataContainer,
  Header,
  LogoutButton,
  MainContainer,
  ProfileContainer,
  UserInfo,
  UserName,
} from './styles';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [warningModalOpen, setWarningModalOpen] = useState(false);

  return (
    <div>
      <WarningModal
        isOpen={warningModalOpen}
        onCancel={() => setWarningModalOpen(false)}
        onConfirm={logout}
        title="Confirmação de Logout"
        message="Tem certeza que deseja sair do sistema?"
        confirmText="Sair"
        cancelText="Cancelar"
      />

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
        <ActionsContainer>
          <abbr title="Sair do sistema">
            <LogoutButton
              type="button"
              onClick={() => setWarningModalOpen(true)}
            >
              <SlLogout size={24} color="#FFFFFF" />
            </LogoutButton>
          </abbr>
          <DataContainer>
            <UserInfo>
              <UserName>{user?.nome}</UserName>
              <p>
                Função: <strong>{user?.role}</strong>
              </p>
            </UserInfo>
            <ProfileContainer>
              <Icon name="Person" />
            </ProfileContainer>
          </DataContainer>
        </ActionsContainer>
      </Header>
      <Navbar />
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

const EmplyeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
};

export default EmplyeeLayout;
