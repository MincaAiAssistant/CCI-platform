import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { StatisticsData } from '@/types/chat-types';
import { Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ChatType } from '@/lib/types';

interface StatisticsProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  stats?: StatisticsData;
  isLoading: boolean;
  type: ChatType;
}

export default function Statistics({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  stats,
  isLoading,
  type,
}: StatisticsProps) {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (startRef.current && !startRef.current.contains(e.target as Node)) {
        setShowStartCalendar(false);
      }
      if (endRef.current && !endRef.current.contains(e.target as Node)) {
        setShowEndCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6 h-4/5">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Key Performance Indicators</h3>
        <div className="flex items-center space-x-2">
          {/* Start Date Picker */}
          <div className="relative" ref={startRef}>
            <Button
              variant="outline"
              className="w-[160px] justify-start text-left font-normal"
              disabled={isLoading}
              onClick={() => setShowStartCalendar((prev) => !prev)}
            >
              <span className="mr-2">Du:</span>
              {startDate ? format(startDate, 'dd MMM yyyy') : 'Sélectionner'}
            </Button>
            {showStartCalendar && (
              <div className="absolute z-10 bg-white shadow-lg border mt-2 rounded">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    setShowStartCalendar(false);
                  }}
                  initialFocus
                  disabled={(date) =>
                    isLoading ||
                    date > new Date() ||
                    (endDate ? date > endDate : false)
                  }
                />
              </div>
            )}
          </div>

          {/* End Date Picker */}
          <div className="relative" ref={endRef}>
            <Button
              variant="outline"
              className="w-[160px] justify-start text-left font-normal"
              disabled={isLoading}
              onClick={() => setShowEndCalendar((prev) => !prev)}
            >
              <span className="mr-2">Au:</span>
              {endDate ? format(endDate, 'dd MMM yyyy') : 'Sélectionner'}
            </Button>
            {showEndCalendar && (
              <div className="absolute z-10 right-0 bg-white shadow-lg border mt-2 rounded">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);
                    setShowEndCalendar(false);
                  }}
                  initialFocus
                  disabled={(date) =>
                    isLoading ||
                    date > new Date() ||
                    (startDate ? date < startDate : false)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Total Conversations
            </div>
            <div className="text-4xl font-bold text-[#1e5dbe]">
              {stats?.numberOfChatId}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {startDate && endDate
                ? `${format(startDate, 'dd MMM')} - ${format(
                    endDate,
                    'dd MMM yyyy'
                  )}`
                : 'Select a period'}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Average Conversations Per Day
            </div>
            <div className="text-4xl font-bold text-[#1e5dbe]">
              {stats?.averageChatPerDay}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {startDate && endDate
                ? `${format(startDate, 'dd MMM')} - ${format(
                    endDate,
                    'dd MMM yyyy'
                  )}`
                : 'Select a period'}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Average Exchanges Per Conversation
            </div>
            <div className="text-4xl font-bold text-[#1e5dbe]">
              {stats?.averageExchangePerChat}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {startDate && endDate
                ? `${format(startDate, 'dd MMM')} - ${format(
                    endDate,
                    'dd MMM yyyy'
                  )}`
                : 'Select a period'}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Calendly Link Sent
            </div>
            <div className="text-4xl font-bold text-[#1e5dbe]">
              {stats?.totalChatsWithCalendy ?? 0}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {startDate && endDate
                ? `${format(startDate, 'dd MMM')} - ${format(
                    endDate,
                    'dd MMM yyyy'
                  )}`
                : 'Select a period'}
            </div>
          </Card>
          {type === 'web' && (
            <Card className="p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Calendly Link Clicked Rate (Web Only)
              </div>
              <div className="text-4xl font-bold text-[#1e5dbe]">
                {stats?.clickRatePercent ?? 0}%
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {startDate && endDate
                  ? `${format(startDate, 'dd MMM')} - ${format(
                      endDate,
                      'dd MMM yyyy'
                    )}`
                  : 'Select a period'}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
