import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Type de données pour une campagne
interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'scheduled' | 'completed';
  audience: string;
  sentCount: number;
  responseRate: number;
  date: string;
  messages: {
    id: string;
    content: string;
    timestamp: string;
    status: 'delivered' | 'read' | 'replied';
    recipient?: string;
  }[];
}

export default function AgentsClient() {
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState('campaigns');
  // États pour les dates de début et de fin
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  // État pour suivre la campagne sélectionnée
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  // Exemples de campagnes (normalement, elles viendraient d'une API)
  const mockCampaigns: Campaign[] = [
    {
      id: 'camp1',
      name: 'Invitation Événement CCI',
      status: 'active',
      audience: 'Membres Premium',
      sentCount: 342,
      responseRate: 78,
      date: '10 mai 2025',
      messages: [
        {
          id: 'msg1',
          content:
            'Bonjour [Prénom], nous vous invitons à notre prochain événement networking le 20 mai. Confirmez votre présence en répondant à ce message.',
          timestamp: '09:30',
          status: 'delivered',
        },
        {
          id: 'msg2',
          content:
            'Nous avons bien reçu votre confirmation. Merci et à bientôt!',
          timestamp: '10:15',
          status: 'replied',
          recipient: 'Jean Dupont',
        },
      ],
    },
    {
      id: 'camp2',
      name: 'Sondage Satisfaction',
      status: 'completed',
      audience: 'Tous les membres',
      sentCount: 1250,
      responseRate: 64,
      date: '2 mai 2025',
      messages: [
        {
          id: 'msg1',
          content:
            'Bonjour [Prénom], pouvez-vous noter de 1 à 10 votre satisfaction concernant nos services?',
          timestamp: '14:00',
          status: 'delivered',
        },
        {
          id: 'msg2',
          content: 'Merci pour votre réponse! Nous apprécions votre feedback.',
          timestamp: '14:30',
          status: 'replied',
          recipient: 'Marie Martin',
        },
      ],
    },
    {
      id: 'camp3',
      name: 'Nouvelle Formation',
      status: 'scheduled',
      audience: 'Secteur Technologie',
      sentCount: 0,
      responseRate: 0,
      date: '20 mai 2025 (programmé)',
      messages: [
        {
          id: 'msg1',
          content:
            'Bonjour [Prénom], découvrez notre nouvelle formation en intelligence artificielle! Places limitées, réservez vite.',
          timestamp: 'Programmé pour 08:00',
          status: 'delivered',
        },
      ],
    },
  ];

  // Statistiques simulées
  const stats = {
    week: {
      totalCampaigns: 2,
      totalMessages: 1592,
      responseRate: 71,
      engagementByType: [
        { type: 'Événements', rate: 78 },
        { type: 'Sondages', rate: 64 },
        { type: 'Formations', rate: 0 },
      ],
    },
    month: {
      totalCampaigns: 8,
      totalMessages: 6481,
      responseRate: 68,
      engagementByType: [
        { type: 'Événements', rate: 74 },
        { type: 'Sondages', rate: 67 },
        { type: 'Formations', rate: 58 },
        { type: 'Nouvelles', rate: 42 },
      ],
    },
  };

  return (
    <Tabs
      defaultValue="campaigns"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="mb-6">
        <TabsTrigger value="campaigns" className="text-base">
          <span className="mr-2">📱</span> Campagnes
        </TabsTrigger>
        <TabsTrigger value="stats" className="text-base">
          <span className="mr-2">📊</span> Statistics (KPIs)
        </TabsTrigger>
      </TabsList>

      {/* Onglet Campagnes */}
      <TabsContent value="campaigns" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Campagnes récentes</h3>
              <button className="px-4 py-1 bg-[#1e5dbe] text-white rounded-md text-sm hover:bg-[#164993] transition-colors">
                Nouvelle
              </button>
            </div>
            <div className="space-y-2">
              {mockCampaigns.map((camp) => (
                <Card
                  key={camp.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedCampaign?.id === camp.id
                      ? 'border-[#1e5dbe] bg-blue-50'
                      : ''
                  }`}
                  onClick={() => setSelectedCampaign(camp)}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{camp.name}</div>
                    <Badge
                      className={
                        camp.status === 'active'
                          ? 'bg-green-500'
                          : camp.status === 'scheduled'
                          ? 'bg-amber-500'
                          : 'bg-gray-500'
                      }
                    >
                      {camp.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {camp.audience}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{camp.date}</div>
                </Card>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedCampaign ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Campagne: {selectedCampaign.name}
                  </h3>
                  <Badge
                    className={
                      selectedCampaign.status === 'active'
                        ? 'bg-green-500'
                        : selectedCampaign.status === 'scheduled'
                        ? 'bg-amber-500'
                        : 'bg-gray-500'
                    }
                  >
                    {selectedCampaign.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="text-sm font-medium text-gray-500">
                      Audience
                    </div>
                    <div className="text-xl font-semibold mt-1">
                      {selectedCampaign.audience}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="text-sm font-medium text-gray-500">
                      Messages envoyés
                    </div>
                    <div className="text-xl font-semibold mt-1">
                      {selectedCampaign.sentCount}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="text-sm font-medium text-gray-500">
                      Taux de réponse
                    </div>
                    <div className="text-xl font-semibold mt-1">
                      {selectedCampaign.responseRate}%
                    </div>
                  </Card>
                </div>

                <Card className="p-4">
                  <div className="font-medium mb-3">Modèle de message</div>
                  <div className="space-y-4">
                    {selectedCampaign.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="border-l-4 border-[#1e5dbe] pl-3 py-1"
                      >
                        <div className="text-sm mb-2">{msg.content}</div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{msg.timestamp}</span>
                          <span>
                            {msg.status === 'delivered'
                              ? '✓ Délivré'
                              : msg.status === 'read'
                              ? '✓✓ Lu'
                              : '↩️ Répondu'}
                            {msg.recipient && ` par ${msg.recipient}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">👈</div>
                  <div>Sélectionnez une campagne pour voir les détails</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      {/* Onglet Statistiques */}
      <TabsContent value="stats">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Indicateurs de performance</h3>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Campagnes totales
              </div>
              <div className="text-4xl font-bold text-[#1e5dbe]">
                {startDate &&
                endDate &&
                Math.abs(endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24) <=
                  10
                  ? stats.week.totalCampaigns
                  : stats.month.totalCampaigns}
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
              <div className="text-sm font-medium text-gray-500 mb-2">
                Messages envoyés
              </div>
              <div className="text-4xl font-bold text-[#1e5dbe]">
                {startDate &&
                endDate &&
                Math.abs(endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24) <=
                  10
                  ? stats.week.totalMessages
                  : stats.month.totalMessages}
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
              <div className="text-sm font-medium text-gray-500 mb-2">
                Taux de réponse moyen
              </div>
              <div className="text-4xl font-bold text-[#1e5dbe]">
                {startDate &&
                endDate &&
                Math.abs(endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24) <=
                  10
                  ? stats.week.responseRate
                  : stats.month.responseRate}
                %
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
          </div>

          <Card className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-4">
              Engagement par type de campagne
            </div>
            <div className="space-y-4">
              {(startDate &&
              endDate &&
              Math.abs(endDate.getTime() - startDate.getTime()) /
                (1000 * 60 * 60 * 24) <=
                10
                ? stats.week.engagementByType
                : stats.month.engagementByType
              ).map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-full max-w-[70%]">
                    <div className="text-sm">{item.type}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-[#1e5dbe] h-2 rounded-full"
                        style={{ width: `${item.rate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium">{item.rate}%</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
