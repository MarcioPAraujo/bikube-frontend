'use client';

import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyle } from '@/styles/global';
import { theme } from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextNProgress from 'nextjs-progressbar';
import { StepsRegistrationProvider } from '@/hooks/useStepsRegistration';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <NextNProgress
            color={theme.colors.WHITE}
            options={{ easing: 'ease', speed: 500 }}
          />
          <StepsRegistrationProvider>{children}</StepsRegistrationProvider>
          <ToastContainer
            style={{
              zIndex: 999999,
              fontSize: '1.6rem',
            }}
          />
        </QueryClientProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
