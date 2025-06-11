import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import SearchBar from '@/components/agent-web/search-bar';
import ConversationList from '@/components/agent-web/conversation-list';
import Statistics from '@/components/agent-web/statistics';
import LeadsDatabase from '@/components/agent-web/leads-database';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getChats, getConversationStatistics } from '@/services/chat-services';
import { Chat } from '@/types/chat-types';
import ConversationDetails from '@/components/agent-web/conversation-detail';

export default function AgentsInternal() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('history');
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedConversation, setSelectedConversation] = useState<Chat | null>(
    null
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const {
    data: chatsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingChats,
  } = useInfiniteQuery({
    queryKey: ['chats'],
    queryFn: ({ pageParam = 1 }) => getChats(pageParam.toString(), '6'),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.page;
      const totalPages = lastPage.pagination.totalPages;
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
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
  const refreshConversations = () => {
    setIsRefreshing(true);
    queryClient
      .resetQueries({ queryKey: ['chats', searchQuery] })
      .finally(() => {
        setRefreshKey((prev) => prev + 1);
        setIsRefreshing(false);
      });
  };

  const allChats = chatsData?.pages.flatMap((page) => page.chats) || [];

  const filteredConversations =
    searchQuery.trim() === ''
      ? allChats
      : allChats.filter(
          (chat) =>
            chat.chatid.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.last_message
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            chat.chatid.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <Tabs
      defaultValue="history"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="mb-6">
        <TabsTrigger value="history" className="text-base">
          <span className="mr-2">🔍</span> Conversation History
        </TabsTrigger>
        <TabsTrigger value="stats" className="text-base">
          <span className="mr-2">📊</span> Statistics (KPIs)
        </TabsTrigger>
        <TabsTrigger value="leads" className="text-base">
          <span className="mr-2">🗃️</span> Leads Database
        </TabsTrigger>
      </TabsList>

      <TabsContent value="history" className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Conversations</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshConversations}
                disabled={isRefreshing}
                className="flex items-center gap-1"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Monitor customer chats handled by your AI assistant.
            </div>
          </div>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 h-[calc(100vh-14rem)]">
            <ConversationList
              refreshKey={refreshKey}
              isLoading={isLoadingChats}
              conversations={filteredConversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              searchQuery={searchQuery}
            />
            <ConversationDetails conversation={selectedConversation} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="stats">
        {isLoadingStats ? (
          <>ddd</>
        ) : (
          statsData && (
            <Statistics
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              stats={statsData}
              isLoading={isLoadingStats}
            />
          )
        )}
      </TabsContent>

      <TabsContent value="leads">
        <LeadsDatabase />
      </TabsContent>
    </Tabs>
  );
}
