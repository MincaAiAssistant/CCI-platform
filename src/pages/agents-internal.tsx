import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Type de données pour une conversation
interface Conversation {
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

export default function AgentsInternal() {
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState('history');
  // États pour les dates de début et de fin
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  // État pour suivre la conversation sélectionnée
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  // État pour la recherche de conversations
  const [searchQuery, setSearchQuery] = useState('');

  // Exemples de conversations (normalement, elles viendraient d'une API)
  const mockConversations: Conversation[] = [
    {
      id: '14679abc-57af-48a6',
      userName: 'Jean Dupont',
      date: '12 mai 2025',
      lastActivity: '1 day ago',
      lastMessage:
        'Bonjour, comment puis-je trouver des informations sur les services CCI?',
      status: 'closed',
      messages: [
        {
          id: 'msg1',
          content:
            'Bonjour, comment puis-je trouver des informations sur les services CCI?',
          sender: 'user',
          timestamp: '10:30',
        },
        {
          id: 'msg2',
          content:
            'Bonjour Jean! Je serais ravi de vous aider à trouver des informations sur nos services. Pouvez-vous me préciser quel type de service vous intéresse en particulier?',
          sender: 'agent',
          timestamp: '10:31',
        },
      ],
    },
    {
      id: 'ff3f5c8-9424-45e2',
      userName: 'Marie Martin',
      date: '11 mai 2025',
      lastActivity: '1 day ago',
      lastMessage: "Je souhaite m'inscrire à un événement",
      status: 'closed',
      messages: [
        {
          id: 'msg1',
          content: "Je souhaite m'inscrire à un événement",
          sender: 'user',
          timestamp: '14:15',
        },
        {
          id: 'msg2',
          content:
            "Bonjour Marie! Bien sûr, je peux vous aider avec l'inscription à un événement. Pouvez-vous me préciser quel événement vous intéresse?",
          sender: 'agent',
          timestamp: '14:16',
        },
      ],
    },
    {
      id: '4e3f3c61-ee6b-48c2',
      userName: 'Robert Garcia',
      date: '10 mai 2025',
      lastActivity: '2 days ago',
      lastMessage: 'Comment puis-je devenir membre de la CCI?',
      status: 'closed',
      messages: [
        {
          id: 'msg1',
          content: 'Comment puis-je devenir membre de la CCI?',
          sender: 'user',
          timestamp: '09:45',
        },
        {
          id: 'msg2',
          content:
            "Bonjour Robert! Pour devenir membre de la CCI, vous devez remplir un formulaire d'adhésion. Puis-je vous guider à travers ce processus?",
          sender: 'agent',
          timestamp: '09:47',
        },
      ],
    },
    {
      id: '1d52776f-2a74-4c36',
      userName: 'Sophie Moreau',
      date: '9 mai 2025',
      lastActivity: '2 days ago',
      lastMessage: 'Je cherche des informations sur les formations disponibles',
      status: 'closed',
      messages: [
        {
          id: 'msg1',
          content: 'Je cherche des informations sur les formations disponibles',
          sender: 'user',
          timestamp: '15:20',
        },
        {
          id: 'msg2',
          content:
            'Bonjour Sophie! Je serais ravi de vous aider à trouver des informations sur nos formations. Quels domaines vous intéressent particulièrement?',
          sender: 'agent',
          timestamp: '15:22',
        },
      ],
    },
    {
      id: '88051ee9-4c82-47d1',
      userName: 'Lucas Bernard',
      date: '8 mai 2025',
      lastActivity: '2 days ago',
      lastMessage: "J'ai besoin d'aide concernant l'export de mes produits",
      status: 'closed',
      messages: [
        {
          id: 'msg1',
          content: "J'ai besoin d'aide concernant l'export de mes produits",
          sender: 'user',
          timestamp: '11:05',
        },
        {
          id: 'msg2',
          content:
            "Bonjour Lucas! Je peux vous aider avec vos questions sur l'exportation. Vers quels pays souhaitez-vous exporter?",
          sender: 'agent',
          timestamp: '11:07',
        },
      ],
    },
  ];

  // Filtrer les conversations en fonction de la recherche
  const filteredConversations =
    searchQuery.trim() === ''
      ? mockConversations
      : mockConversations.filter(
          (conv) =>
            conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.lastMessage
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            conv.id.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Statistiques simulées
  const stats = {
    week: {
      totalConversations: 27,
      commonQuestions: [
        { question: 'Adhésion CCI', count: 12 },
        { question: 'Événements', count: 8 },
        { question: 'Services aux entreprises', count: 7 },
      ],
    },
    month: {
      totalConversations: 124,
      commonQuestions: [
        { question: 'Adhésion CCI', count: 45 },
        { question: 'Événements', count: 32 },
        { question: 'Services aux entreprises', count: 28 },
        { question: 'Formation', count: 19 },
      ],
    },
  };

  return (
    <Tabs
      defaultValue="history"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="mb-6">
        <TabsTrigger value="history" className="text-base">
          <span className="mr-2">🔍</span> Conversation History
        </TabsTrigger>
        <TabsTrigger value="stats" className="text-base">
          <span className="mr-2">📊</span> Statistics (KPIs)
        </TabsTrigger>
      </TabsList>

      {/* Onglet Historique des conversations */}
      <TabsContent value="history" className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Conversations</h2>
            <div className="text-sm text-gray-500">
              Monitor customer chats handled by your AI assistant.
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e5dbe] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 h-[calc(100vh-14rem)]">
            <div className="md:col-span-3 overflow-y-auto h-full">
              <div className="bg-white rounded-md border border-gray-200 overflow-hidden h-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    {filteredConversations.map((conv) => (
                      <tr
                        key={conv.id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedConversation?.id === conv.id
                            ? 'bg-blue-50'
                            : ''
                        }`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {conv.id}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-[250px]">
                            {conv.lastMessage}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {conv.lastActivity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="md:col-span-4 h-full">
              {selectedConversation ? (
                <div className="flex flex-col h-full rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-white px-4 py-2 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-medium text-gray-700">
                        {selectedConversation.id}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2">
                    <div className="space-y-3">
                      {selectedConversation.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          {msg.sender === 'agent' && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e5dbe] text-white mr-2 flex-shrink-0">
                              <span className="text-xs font-medium">AI</span>
                            </div>
                          )}
                          <div
                            className={`max-w-[70%] p-2 rounded-lg ${
                              msg.sender === 'user'
                                ? 'bg-[#1e5dbe] text-white rounded-tr-none'
                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                            }`}
                          >
                            <div
                              className={`${
                                msg.sender === 'user'
                                  ? 'text-white'
                                  : 'text-gray-800'
                              } text-sm`}
                            >
                              {msg.content}
                            </div>
                            <div
                              className={`text-xs ${
                                msg.sender === 'user'
                                  ? 'text-blue-100'
                                  : 'text-gray-500'
                              }`}
                            >
                              {msg.timestamp}
                            </div>
                          </div>
                          {msg.sender === 'user' && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 ml-2 flex-shrink-0">
                              <span className="text-xs font-medium">U</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-2 border-t">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#1e5dbe] focus:border-transparent"
                        disabled={selectedConversation.status === 'closed'}
                      />
                      <button
                        className="bg-[#1e5dbe] text-white px-4 py-2 rounded-r-md hover:bg-[#164993] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                        disabled={selectedConversation.status === 'closed'}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">👈</div>
                    <div>Select a conversation to view details</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Onglet Statistiques */}
      <TabsContent value="stats">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Key Performance Indicators</h3>

            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[160px] justify-start text-left font-normal"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">Du:</span>
                      {startDate
                        ? format(startDate, 'dd MMM yyyy')
                        : 'Sélectionner'}
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    disabled={(date) =>
                      date > new Date() || (endDate ? date > endDate : false)
                    }
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[160px] justify-start text-left font-normal"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">Au:</span>
                      {endDate
                        ? format(endDate, 'dd MMM yyyy')
                        : 'Sélectionner'}
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) =>
                      date > new Date() ||
                      (startDate ? date < startDate : false)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Total Conversations
              </div>
              <div className="text-4xl font-bold text-[#1e5dbe]">
                {startDate &&
                endDate &&
                Math.abs(endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24) <=
                  10
                  ? stats.week.totalConversations
                  : stats.month.totalConversations}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {startDate && endDate
                  ? `${format(startDate, 'dd MMM')} - ${format(
                      endDate,
                      'dd MMM yyyy'
                    )}`
                  : 'Sélectionnez une période'}
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-sm font-medium text-gray-500 mb-4">
                Frequency of Common Questions
              </div>
              <div className="space-y-3">
                {(startDate &&
                endDate &&
                Math.abs(endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24) <=
                  10
                  ? stats.week.commonQuestions
                  : stats.month.commonQuestions
                ).map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full max-w-[70%]">
                      <div className="text-sm">{item.question}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-[#1e5dbe] h-2 rounded-full"
                          style={{
                            width: `${
                              (item.count /
                                (startDate &&
                                endDate &&
                                Math.abs(
                                  endDate.getTime() - startDate.getTime()
                                ) /
                                  (1000 * 60 * 60 * 24) <=
                                  10
                                  ? stats.week.totalConversations
                                  : stats.month.totalConversations)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-sm font-medium">{item.count}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
