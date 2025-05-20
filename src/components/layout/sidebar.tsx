import { useAgentContext } from '@/context/agent-context';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const { activeView, setActiveView, selectAgent } = useAgentContext();

  return (
    <aside className="bg-gradient-to-b from-[#00a1cb] to-[#1e5dbe] text-white w-80 flex-shrink-0 hidden md:flex md:flex-col overflow-y-auto h-screen">
      <div className="p-6 flex flex-col items-center justify-center">
        {/* CCI logo */}
        <div className="w-[140px] h-[80px] flex items-center justify-center">
          <img src={'/cci-logo.png'} alt="Logo CCI" className="h-20 w-20" />
        </div>
        <div className="mt-2 w-full flex justify-center">
          <div className="flex items-center bg-gradient-to-r from-[#0057a4]/10 to-[#e2003b]/10 px-6 py-3 rounded-lg">
            <span className="text-[#0057a4] font-bold text-2xl tracking-wide">
              CCI
            </span>
            <span className="text-white font-bold text-xl mx-2">Mexico IA</span>
            <span className="text-white/90 text-lg">interface</span>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="mt-4 px-4">
        <div
          onClick={() => {
            window.location.href = '/';
          }}
          className={cn(
            'px-4 py-2 flex items-center cursor-pointer rounded-md hover:bg-[#0288d1]/40 transition-all text-white mb-1',
            location.pathname === '/' ? 'bg-[#0288d1]/30' : ''
          )}
        >
          <div className="flex items-center space-x-3">
            <span className="text-white w-6 h-6 flex items-center justify-center">
              <i className="fas fa-tachometer-alt"></i>
            </span>
            <span>Welcome</span>
          </div>
        </div>
      </div>

      <div className="mt-6 px-6">
        <div className="text-sm text-white/90 uppercase font-medium tracking-wider">
          Agents Support
        </div>
      </div>

      <div className="mt-4 px-4">
        <div
          onClick={() => {
            setActiveView('internal');
            selectAgent(null);
            window.location.href = '/agents-internal';
          }}
          className={cn(
            'px-4 py-2 flex items-center cursor-pointer rounded-md hover:bg-[#0288d1]/40 transition-all text-white mb-1',
            (location.pathname === '/agents-internal' ||
              location.pathname === '/') &&
              activeView === 'internal'
              ? 'bg-[#0288d1]/30'
              : ''
          )}
        >
          <div className="flex items-center space-x-3">
            <span className="text-yellow-300 w-6 h-6 flex items-center justify-center">
              <i className="fas fa-globe"></i>
            </span>
            <span>Agent Web</span>
          </div>
        </div>

        <div
          onClick={() => {
            setActiveView('internal');
            selectAgent(null);
            window.location.href = '/agents-internal';
          }}
          className="px-4 py-2 flex items-center cursor-pointer rounded-md hover:bg-[#0288d1]/40 transition-all text-white mb-1"
        >
          <div className="flex items-center space-x-3">
            <span className="text-green-300 w-6 h-6 flex items-center justify-center">
              <i className="fab fa-whatsapp"></i>
            </span>
            <span>Agent WhatsApp</span>
          </div>
        </div>
      </div>

      <div className="mt-6 px-6">
        <div className="text-sm text-white/90 uppercase font-medium tracking-wider">
          WhatsApp Campaign
        </div>
      </div>

      <div className="mt-4 px-4">
        <div
          onClick={() => {
            setActiveView('client');
            selectAgent(null);
            window.location.href = '/agents-client';
          }}
          className={cn(
            'px-4 py-2 flex items-center cursor-pointer rounded-md hover:bg-[#0288d1]/40 transition-all text-white mb-1',
            location.pathname === '/agents-client' && activeView === 'client'
              ? 'bg-[#0288d1]/30'
              : ''
          )}
        >
          <div className="flex items-center space-x-3">
            <span className="text-blue-300 w-6 h-6 flex items-center justify-center">
              <i className="fas fa-bullhorn"></i>
            </span>
            <span>Agent Campagne</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
