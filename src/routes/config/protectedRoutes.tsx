import { Route } from '@/lib/types';
import AgentsClient from '@/pages/agents-client';
import AgentsInternal from '@/pages/agents-internal';
import Dashboard from '@/pages/dashboard';

export const protectedRoutes: Route[] = [
  {
    path: '/',
    component: <Dashboard />,
  },
  {
    path: '/agents-internal',
    component: <AgentsInternal />,
  },
  {
    path: '/agents-client',
    component: <AgentsClient />,
  },
];
