import Providers from '@/components/Provider/Providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'Bikube',
  description: 'Bikube, um sistema de autenticação e gestão de usuários voltado ao setor de recursos humanos. ',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
