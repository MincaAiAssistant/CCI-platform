import { protectedAPIRequest } from '@/lib/queryClient';
import { Chat, Message, Pagination, StatisticsData } from '@/types/chat-types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getWebChats = async (
  page: string,
  pageSize: string
): Promise<{ chats: Chat[]; pagination: Pagination }> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/chat?page=${page}&pageSize=${pageSize}`
  );
  return response.json();
};

const getWebMessages = async (id: string): Promise<Message[]> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/chat/${id}/message`
  );
  return response.json();
};

const getWebConversationStatistics = async (
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
const getWhatsappChats = async (
  page: string,
  pageSize: string
): Promise<{ chats: Chat[]; pagination: Pagination }> => {
  return {
    chats: [],
    pagination: {
      total: 0,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: 0,
    },
  };
};

const getWhatsappMessages = async (id: string): Promise<Message[]> => {
  return [];
};

const getWhatsappConversationStatistics = async (
  startDate: string,
  endDate: string
): Promise<StatisticsData> => {
  return {
    numberOfChatId: 0,
    averageChatPerDay: 0,
    averageExchangePerChat: 0,
  };
};
export {
  getWebChats,
  getWebMessages,
  getWebConversationStatistics,
  getWhatsappChats,
  getWhatsappConversationStatistics,
  getWhatsappMessages,
};
