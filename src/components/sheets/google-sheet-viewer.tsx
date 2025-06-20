import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw, Upload } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { upsertLeads } from '@/services/chat-services';
import { toast } from 'sonner';

/**
 * Component to display and interact with the Google Sheet
 */
const GoogleSheetViewer = () => {
  // Google Sheet URLs
  const SHEET_URL =
    'https://docs.google.com/spreadsheets/d/1b1k-sJzzUBuUArcqFJcciPId73fNui40d4CDudLkzpM/edit?gid=0';

  // State to refresh the iframe
  const [refreshKey, setRefreshKey] = React.useState(0);

  const { mutate: upsert, isPending } = useMutation({
    mutationFn: upsertLeads,
    onSuccess: () => {
      toast.success('Leads upserted');
      setRefreshKey((prev) => prev + 1);
    },
    onError: () => {
      toast.error('Failed to upsert leads');
    },
  });
  // Open the Google Sheet in a new tab
  const openInGoogleSheets = () => {
    window.open(SHEET_URL, '_blank');
  };

  // Refresh the iframe to get the latest data
  const refreshSheet = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-col h-full rounded-md border border-gray-200">
      {/* Header with buttons to interact with the Google Sheet */}
      <div className="flex justify-between items-center p-4 border-b bg-white rounded-t-md">
        <div className="flex gap-2">
          <h3 className="text-lg font-medium">Leads Database</h3>
          <Button
            variant="default"
            size="sm"
            onClick={() => upsert()}
            disabled={isPending}
            className="flex items-center gap-1 bg-[#1e5dbe] hover:bg-[#00a1cb]"
          >
            <Upload className="h-4 w-4" />
            {isPending ? 'Uploading...' : 'Upsert Leads'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshSheet}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={openInGoogleSheets}
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Google Sheets
          </Button>
        </div>
      </div>

      {/* Iframe to display the Google Sheet */}
      <div className="flex-1 bg-white">
        <div className=" relative h-full overflow-hidden">
          <iframe
            key={refreshKey}
            src={SHEET_URL}
            className="w-full h-[calc(100%+25px)] -mb-[25px] border-none relative z-[1]"
            title="Leads Database"
            onError={() => {
              console.error('Failed to load Google Sheet iframe');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetViewer;
