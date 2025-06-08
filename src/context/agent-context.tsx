import { Agent, Message } from '@/types/agents';
import { createContext, useContext, useState, ReactNode } from 'react';

// Context type definition
interface AgentContextType {
  agents: Agent[];
  selectedAgent: Agent | null;
  messages: Message[];
  selectAgent: (agent: Agent | null) => void;
  sendMessage: (content: string) => void;
  activeView: 'internal' | 'client';
  setActiveView: (view: 'internal' | 'client') => void;
}

const agentsData: Agent[] = [
  {
    id: 'matching',
    name: 'Member Matching Agent',
    description: 'Recommendations for synergies between members',
    icon: 'handshake',
    welcomeMessage:
      'Hello, I am your virtual assistant for identifying potential synergies between CCI members. How can I help you today?',
  },
  {
    id: 'content',
    name: 'Content Creation & Monitoring Agent',
    description: 'Automatic content generation, newsletters, monitoring',
    icon: 'pen-fancy',
    welcomeMessage:
      'Hello, I am your content creation assistant. I can help you generate newsletters, articles, and monitoring reports. What would you like to create today?',
  },
  {
    id: 'hr',
    name: 'HR & Recruitment Agent',
    description: 'Automated application processing',
    icon: 'user-plus',
    welcomeMessage:
      'Hello, I am your HR assistant. I can help you analyze CVs, prepare job offers, or organize your recruitment process. How can I help you?',
  },
  {
    id: 'offers',
    name: 'Tender Agent',
    description: 'Targeted monitoring of public tenders',
    icon: 'file-contract',
    welcomeMessage:
      'Hello, I am your tender assistant. I can help you identify relevant opportunities and prepare your responses. What are you looking for?',
  },
];

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeView, setActiveView] = useState<'internal' | 'client'>(
    'internal'
  );

  const selectAgent = (agent: Agent | null) => {
    setSelectedAgent(agent);

    if (agent) {
      // Add welcome message from the agent
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          content: agent.welcomeMessage,
          sender: 'agent',
          timestamp: new Date(),
          agentId: agent.id,
        },
      ]);
    } else {
      setMessages([]);
    }
  };

  const sendMessage = (content: string) => {
    if (!content.trim() || !selectedAgent) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // In a real application, you would send the message to an API
    // and receive a response from the agent
    // For now, we'll simulate a response after a short delay
    setTimeout(() => {
      const agentResponse: Message = {
        id: `agent-${Date.now()}`,
        content: `Je suis l'${selectedAgent.name} et je vais vous aider avec votre demande concernant "${content}".`,
        sender: 'agent',
        timestamp: new Date(),
        agentId: selectedAgent.id,
      };

      setMessages((prev) => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <AgentContext.Provider
      value={{
        agents: agentsData,
        selectedAgent,
        messages,
        selectAgent,
        sendMessage,
        activeView,
        setActiveView,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgentContext() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgentContext must be used within an AgentProvider');
  }
  return context;
}
