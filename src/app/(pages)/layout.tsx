'use client';

import { useAuth } from '@/hooks/useAuth';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAuth();
  console.log('user', user);
  return <div>{children}</div>;
};
export default Layout;
