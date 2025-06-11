import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SearchBar from '@/components/agent-web/search-bar';
import ConversationList from '@/components/agent-web/conversation-list';
import ConversationDetails from '@/components/agent-web/conversation-detail';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getChats } from '@/services/chat-services';
import { Chat } from '@/types/chat-types';

export default function ConversationHistory() {
  const queryClient = useQueryClient();
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

  const refreshConversations = () => {
    setIsRefreshing(true);
    queryClient.resetQueries({ queryKey: ['chats'] }).finally(() => {
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
    <div className="w-full">
      <Tabs value="history" className="w-full">
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
      <div className="space-y-4">
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
            />
            <ConversationDetails conversation={selectedConversation} />
          </div>
        </div>
      </div>
    </div>
  );
}
