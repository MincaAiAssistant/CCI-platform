import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getConversationStatistics } from '@/services/chat-services';
import Statistics from '@/components/agent-web/statistics';

export default function ConversationStatistics() {
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ['statistics', startDate, endDate],
    queryFn: () =>
      getConversationStatistics(
        startDate
          ? formatDate(startDate)
          : formatDate(new Date(new Date().setDate(new Date().getDate() - 7))),
        endDate ? formatDate(endDate) : formatDate(new Date())
      ),
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
            <NavLink to="/conversation-history" className="text-base">
              <span className="mr-2">🔍</span> Conversation History
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="stats" asChild>
            <NavLink to="/conversation-statistics" className="text-base">
              <span className="mr-2">📊</span> Statistics (KPIs)
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="leads" asChild>
            <NavLink to="/leads-database" className="text-base">
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
        />
      </div>
    </div>
  );
}
