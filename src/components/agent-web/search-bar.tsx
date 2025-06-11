import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className="fas fa-search text-gray-400"></i>
      </div>
      <Input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e5dbe] focus:border-transparent"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
