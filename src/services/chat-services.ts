import { protectedAPIRequest } from '@/lib/queryClient';
import { ChatType } from '@/lib/types';
import { Chat, Message, Pagination, StatisticsData } from '@/types/chat-types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getChats = async (
  page: string,
  pageSize: string,
  type: ChatType
): Promise<{ chats: Chat[]; pagination: Pagination }> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/chat?page=${page}&pageSize=${pageSize}&type=${type}`
  );
  return response.json();
};

const getMessages = async (id: string): Promise<Message[]> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/chat/${id}/message`
  );
  return response.json();
};

const getConversationStatistics = async (
  startDate: string,
  endDate: string,
  type: ChatType
): Promise<StatisticsData> => {
  const response = await protectedAPIRequest(
    'POST',
    `${BASE_URL}/analytics/overall?type=${type}`,
    { start_date: startDate, end_date: endDate }
  );
  return response.json();
};

const upsertLeads = async () => {
  const response = await protectedAPIRequest(
    'POST',
    `${BASE_URL}/chat/last_activity/unstored`
  );
  return response.json();
};

export { getChats, getMessages, getConversationStatistics, upsertLeads };
