'use client';

import AuthProvider from '@/hooks/useAuth';

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default EmployeeLayout;
