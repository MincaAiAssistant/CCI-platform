import { Agent, Message } from '@/types/agents';
import { createContext, useContext, useState, ReactNode } from 'react';

// Définition du type de contexte
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
    name: 'Agent Matching Membres',
    description: 'Recommandations de synergies entre membres',
    icon: 'handshake',
    welcomeMessage:
      "Bonjour, je suis votre assistant virtuel pour identifier des synergies potentielles entre les membres de la CCI. Comment puis-je vous aider aujourd'hui ?",
  },
  {
    id: 'content',
    name: 'Agent Création de Contenu & Veille',
    description: 'Génération automatique de contenus, newsletters, veilles',
    icon: 'pen-fancy',
    welcomeMessage:
      "Bonjour, je suis votre assistant de création de contenu. Je peux vous aider à générer des newsletters, articles, et rapports de veille. Que souhaitez-vous créer aujourd'hui ?",
  },
  {
    id: 'hr',
    name: 'Agent RH & Recrutement',
    description: 'Traitement automatisé de candidatures',
    icon: 'user-plus',
    welcomeMessage:
      "Bonjour, je suis votre assistant RH. Je peux vous aider à analyser des CV, préparer des offres d'emploi ou organiser votre processus de recrutement. Comment puis-je vous aider ?",
  },
  {
    id: 'offers',
    name: "Agent Appels d'Offres",
    description: "Veille ciblée sur les appels d'offres publics",
    icon: 'file-contract',
    welcomeMessage:
      "Bonjour, je suis votre assistant pour les appels d'offres. Je peux vous aider à identifier les opportunités pertinentes et à préparer vos réponses. Quelle est votre recherche ?",
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
