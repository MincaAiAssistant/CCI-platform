import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavLink, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Statistics from '@/components/agent-web/statistics';

import { ChatType } from '@/lib/types';
import { getConversationStatistics } from '@/services/chat-services';

export default function ConversationStatistics() {
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const params = useParams();
  const type = (params.type ?? '') as ChatType;
  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ['statistics', type, startDate, endDate],
    queryFn: () => {
      const fromDate = startDate
        ? formatDate(startDate)
        : formatDate(new Date(new Date().setDate(new Date().getDate() - 7)));
      const toDate = endDate ? formatDate(endDate) : formatDate(new Date());

      return getConversationStatistics(fromDate, toDate, type);
    },
    enabled: !!startDate && !!endDate,
  });

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Tabs value="stats" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="history" asChild>
            <NavLink to={`/${type}/conversation-history`} className="text-base">
              <span className="mr-2">🔍</span> Conversation History
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="stats" asChild>
            <NavLink
              to={`/${type}/conversation-statistics`}
              className="text-base"
            >
              <span className="mr-2">📊</span> Statistics (KPIs)
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="leads" asChild>
            <NavLink to={`/${type}/leads-database`} className="text-base">
              <span className="mr-2">🗃️</span> Leads Database
            </NavLink>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col h-full flex-1">
        <Statistics
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          stats={statsData}
          isLoading={isLoadingStats}
          type={type}
        />
      </div>
    </div>
  );
}
