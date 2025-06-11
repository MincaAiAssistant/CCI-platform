import { useAgentContext } from '@/context/agent-context';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { setActiveView, selectAgent } = useAgentContext();

  const handleAgentSelection = (agentType: 'internal' | 'client') => {
    setActiveView(agentType);
    selectAgent(null);
    navigate('/conversation-history');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Agent IA CCI Mexico
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border-t-4 border-[#1e5dbe]"
          onClick={() => handleAgentSelection('internal')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-b from-[#00a1cb] to-[#1e5dbe] rounded-full flex items-center justify-center mb-4">
              <span className="text-yellow-300 text-2xl">
                <i className="fas fa-globe"></i>
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              AI Agent – Web
            </h2>
            <p className="text-gray-600">
              Online assistance for your website visitors
            </p>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border-t-4 border-[#1e5dbe]"
          onClick={() => handleAgentSelection('internal')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-b from-[#00a1cb] to-[#1e5dbe] rounded-full flex items-center justify-center mb-4">
              <span className="text-green-300 text-2xl">
                <i className="fab fa-whatsapp"></i>
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              AI Agent – WhatsApp
            </h2>
            <p className="text-gray-600">
              Interactive customer support via WhatsApp
            </p>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border-t-4 border-[#1e5dbe]"
          onClick={() => handleAgentSelection('client')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-b from-[#00a1cb] to-[#1e5dbe] rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-300 text-2xl">
                <i className="fas fa-bullhorn"></i>
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              AI Agent – WhatsApp Campaigns
            </h2>
            <p className="text-gray-600">
              Automate your marketing campaigns on WhatsApp
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
