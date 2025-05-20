import { ReactNode } from 'react';
import { AgentProvider } from './context/agent-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { TooltipProvider } from './components/ui/tooltip';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AgentProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </AgentProvider>
  );
}
