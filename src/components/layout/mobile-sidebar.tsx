import { cn } from '@/lib/utils';
import { useAgentContext } from '@/context/agent-context';
import { useLocation } from 'react-router-dom';

export default function MobileSidebar() {
  const location = useLocation();
  const { activeView, setActiveView, selectAgent } = useAgentContext();

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-gradient-to-r from-[#00a1cb] to-[#1e5dbe] z-50">
      <div className="flex justify-around py-3">
        {/* Dashboard */}
        <div
          onClick={() => {
            window.location.href = '/';
          }}
          className={cn(
            'text-white p-3 rounded-full flex items-center justify-center',
            location.pathname === '/' && !activeView ? 'bg-[#0288d1]/50' : ''
          )}
        >
          <i className="fas fa-tachometer-alt text-white"></i>
        </div>

        {/* Agent Support */}
        <div
          onClick={() => {
            setActiveView('internal');
            selectAgent(null);
            window.location.href = '/agents-internal';
          }}
          className={cn(
            'text-white p-3 rounded-full flex items-center justify-center',
            (location.pathname === '/agents-internal' ||
              location.pathname === '/') &&
              activeView === 'internal'
              ? 'bg-[#0288d1]/50'
              : ''
          )}
        >
          <i className="fas fa-globe text-yellow-200"></i>
        </div>

        {/* WhatsApp Campaign */}
        <div
          onClick={() => {
            setActiveView('client');
            selectAgent(null);
            window.location.href = '/agents-client';
          }}
          className={cn(
            'text-white p-3 rounded-full flex items-center justify-center',
            location.pathname === '/agents-client' && activeView === 'client'
              ? 'bg-[#0288d1]/50'
              : ''
          )}
        >
          <i className="fab fa-whatsapp text-green-200"></i>
        </div>
      </div>
    </div>
  );
}
