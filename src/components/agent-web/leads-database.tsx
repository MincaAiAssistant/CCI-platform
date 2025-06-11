import GoogleSheetViewer from '@/components/sheets/google-sheet-viewer';

export default function LeadsDatabase() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Leads Database</h2>
      </div>
      <div className="w-full h-[calc(100vh-16rem)] bg-white rounded-md border border-gray-200">
        <GoogleSheetViewer />
      </div>
    </div>
  );
}
