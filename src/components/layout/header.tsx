import { useAuthStore } from '@/lib/auth-store';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { user } = useAuthStore();
  return (
    <header className="bg-white shadow-sm flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <button className="md:hidden text-gray-500">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-bell"></i>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-question-circle"></i>
        </button>
        <div className="md:flex items-center space-x-2 hidden">
          <span className="text-sm text-gray-700">{user?.email}</span>
          <div className="w-8 h-8 rounded-full bg-[#0369a1] flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
