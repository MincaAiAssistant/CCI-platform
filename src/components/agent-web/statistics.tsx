import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { StatisticsData } from '@/types/chat-types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface StatisticsProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  stats?: StatisticsData;
  isLoading: boolean;
}

export default function Statistics({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  stats,
  isLoading,
}: StatisticsProps) {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    setStartDateOpen(false);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    setEndDateOpen(false);
  };

  return (
    <div className="space-y-6 h-4/5">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Key Performance Indicators</h3>
        <div className="flex items-center space-x-2">
          <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[160px] justify-start text-left font-normal"
                disabled={isLoading}
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
                onSelect={handleStartDateSelect}
                initialFocus
                disabled={(date) =>
                  isLoading ||
                  date > new Date() ||
                  (endDate ? date > endDate : false)
                }
              />
            </PopoverContent>
          </Popover>
          <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
            <PopoverTrigger asChild>
              <Button
                disabled={isLoading}
                variant="outline"
                className="w-[160px] justify-start text-left font-normal"
              >
                <div className="flex items-center">
                  <span className="mr-2">Au:</span>
                  {endDate ? format(endDate, 'dd MMM yyyy') : 'Sélectionner'}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateSelect}
                initialFocus
                disabled={(date) =>
                  isLoading ||
                  date > new Date() ||
                  (startDate ? date < startDate : false)
                }
              />
            </PopoverContent>
          </Popover>
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
          {/* <Card className="p-6">
          <div className="text-sm font-medium text-gray-500 mb-2">
            Calendly Link Click Rate (Web Only)
          </div>
          <div className="text-4xl font-bold text-[#1e5dbe]">
            {startDate &&
            endDate &&
            Math.abs(endDate.getTime() - startDate.getTime()) /
              (1000 * 60 * 60 * 24) <=
              10
              ? '23%'
              : '19%'}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {startDate && endDate
              ? `${format(startDate, 'dd MMM')} - ${format(
                  endDate,
                  'dd MMM yyyy'
                )}`
              : 'Select a period'}
          </div>
        </Card> */}
          {/* <Card className="p-6 md:col-span-2">
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
                            Math.abs(endDate.getTime() - startDate.getTime()) /
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
        </Card> */}
        </div>
      )}
    </div>
  );
}
