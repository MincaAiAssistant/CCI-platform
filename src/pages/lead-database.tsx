import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavLink, useParams } from 'react-router-dom';
import GoogleSheetViewer from '@/components/sheets/google-sheet-viewer';
import { ChatType } from '@/lib/types';

export default function LeadsDatabasePage() {
  const params = useParams();
  const type = (params.type ?? '') as ChatType;
  return (
    <div className="w-full">
      <Tabs value="leads" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="history" asChild>
            <NavLink to={`/${type}/conversation-history`} className="text-base">
              <span className="mr-2">🔍</span> Conversation History
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="stats" asChild>
            <NavLink
              to={`/${type}/conversation-statistics`}
              className="text-base"
            >
              <span className="mr-2">📊</span> Statistics (KPIs)
            </NavLink>
          </TabsTrigger>
          <TabsTrigger value="leads" asChild>
            <NavLink to={`/${type}/leads-database`} className="text-base">
              <span className="mr-2">🗃️</span> Leads Database
            </NavLink>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Leads Database</h2>
        </div>
        <div className="w-full h-[calc(100vh-16rem)] bg-white rounded-md border border-gray-200">
          <GoogleSheetViewer />
        </div>
      </div>
    </div>
  );
}
