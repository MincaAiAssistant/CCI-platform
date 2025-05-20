import { Outlet } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import MobileSidebar from './mobile-sidebar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title="Welcome" />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <MobileSidebar />
    </div>
  );
};

export default MainLayout;
