import { Route } from '@/lib/types';
import AgentsClient from '@/pages/agents-client';
import ConversationHistory from '@/pages/conversation-history';
import ConversationStatistics from '@/pages/conversation-statistics';
import Dashboard from '@/pages/dashboard';
import LeadsDatabase from '@/pages/lead-database';

export const protectedRoutes: Route[] = [
  {
    path: '/',
    component: <Dashboard />,
  },
  {
    path: '/conversation-history',
    component: <ConversationHistory />,
  },
  {
    path: '/conversation-statistics',
    component: <ConversationStatistics />,
  },
  {
    path: '/leads-database',
    component: <LeadsDatabase />,
  },
  {
    path: '/agents-client',
    component: <AgentsClient />,
  },
];
