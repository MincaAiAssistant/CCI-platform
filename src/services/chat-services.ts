import { protectedAPIRequest } from '@/lib/queryClient';
import { Chat, Message, Pagination, StatisticsData } from '@/types/chat-types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getChats = async (
  page: string,
  pageSize: string
): Promise<{ chats: Chat[]; pagination: Pagination }> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/chat?page=${page}&pageSize=${pageSize}`
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
  endDate: string
): Promise<StatisticsData> => {
  const response = await protectedAPIRequest(
    'POST',
    `${BASE_URL}/analytics/overall`,
    { start_date: startDate, end_date: endDate }
  );
  return response.json();
};
export { getChats, getMessages, getConversationStatistics };
