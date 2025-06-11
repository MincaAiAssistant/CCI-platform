export type AgentType = 'matching' | 'content' | 'hr' | 'offers';

export interface Agent {
  id: AgentType;
  name: string;
  description: string;
  icon: string;
  welcomeMessage: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentId?: AgentType;
}

// src/lib/types.ts
export interface Conversation {
  id: string;
  userName: string;
  date: string;
  lastActivity: string;
  lastMessage: string;
  status: 'active' | 'closed';
  messages: {
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: string;
  }[];
}
