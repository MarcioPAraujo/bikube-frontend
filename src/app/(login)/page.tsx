'use client';

import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={() => router.push('/candidato-login')}>
        login de candidato
      </button>
    </div>
  );
};

export default Login;
