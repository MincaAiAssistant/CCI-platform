import { Chat } from '@/types/chat-types';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ConversationListProps {
  conversations: Chat[];
  selectedConversation: Chat | null;
  setSelectedConversation: (conversation: Chat | null) => void;
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  refreshKey: number;
  searchQuery: string;
}

export default function ConversationList({
  conversations,
  selectedConversation,
  setSelectedConversation,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  refreshKey,
  searchQuery,
}: ConversationListProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [refreshKey]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage &&
            fetchNextPage
          ) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      observerRef.current = observer;

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    } else {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, searchQuery]);
  return (
    <div
      className="md:col-span-3 overflow-y-auto h-full"
      ref={scrollContainerRef}
    >
      <div className="bg-white rounded-md border border-gray-200 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No conversations found
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 min-w-[230px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last activity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {conversations.map((chat) => (
                  <tr
                    key={chat.chatid}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedConversation?.chatid === chat.chatid
                        ? 'bg-blue-50'
                        : ''
                    }`}
                    onClick={() => setSelectedConversation(chat)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 truncate max-w-[250px]">
                        {chat.chatid}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-[250px]">
                        {chat.last_message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(new Date(chat.lastactivity), {
                        addSuffix: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {hasNextPage && (
            <div
              ref={loadMoreRef}
              className="flex items-center justify-center py-4"
            >
              {isFetchingNextPage && (
                <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
