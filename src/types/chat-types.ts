export interface Chat {
  chatid: string;
  type: string;
  lastactivity: Date;
  last_message: string;
}

export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Message {
  messageid: string;
  content: string;
  role: 'customer' | 'agent';
  created_at: Date;
}

export interface StatisticsData {
  numberOfChatId: number;
  averageChatPerDay: number;
  averageExchangePerChat: number;
  clickRatePercent?: number;
}
