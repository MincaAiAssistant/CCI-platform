import { Chat } from '@/types/chat-types';
import { useQuery } from '@tanstack/react-query';
import { getWebMessages, getWhatsappMessages } from '@/services/chat-services';
import { Loader2 } from 'lucide-react';
import { ChatType } from '@/lib/types';

interface ConversationDetailsProps {
  conversation: Chat | null;
  type: ChatType;
}

export default function ConversationDetails({
  conversation,
  type,
}: ConversationDetailsProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['messages', type, conversation?.chatid],
    queryFn: () => {
      if (!conversation) return Promise.resolve([]);
      return type === 'whatsapp'
        ? getWhatsappMessages(conversation.chatid)
        : getWebMessages(conversation.chatid);
    },
    enabled: !!conversation,
  });

  if (!conversation) {
    return (
      <div className="md:col-span-4 h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">👈</div>
          <div>Select a conversation to view details</div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-4 h-full overflow-y-auto">
      <div className="flex flex-col h-full rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-white px-4 py-2 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium text-gray-700">
              {conversation.chatid}
            </h3>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center h-full text-red-500">
              <div>
                Error loading messages: {error?.message || 'Unknown error'}
              </div>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No messages found
            </div>
          ) : (
            <div className="space-y-3">
              {data.map((msg) => (
                <div
                  key={msg.messageid}
                  className={`flex ${
                    msg.role === 'customer' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'agent' && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e5dbe] text-white mr-2 flex-shrink-0">
                      <span className="text-xs font-medium">AI</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-2 rounded-lg ${
                      msg.role === 'customer'
                        ? 'bg-[#1e5dbe] text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                    }`}
                  >
                    <div
                      className={`${
                        msg.role === 'customer' ? 'text-white' : 'text-gray-800'
                      } text-sm whitespace-pre-wrap`}
                    >
                      {msg.content}
                    </div>
                    <div
                      className={`text-xs ${
                        msg.role === 'customer'
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                  {msg.role === 'customer' && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 ml-2 flex-shrink-0">
                      <span className="text-xs font-medium">U</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white p-2 border-t">
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#1e5dbe] focus:border-transparent"
              disabled
            />
            <button
              className="bg-[#1e5dbe] text-white px-4 py-2 rounded-r-md hover:bg-[#164993] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
              disabled
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
