import { useState } from 'react';
import { Bell, Settings, Home as HomeIcon } from 'lucide-react';
import { ObjectCard, TrackedObject } from './ObjectCard';
import { AlertNotification, Alert } from './AlertNotification';
import { VoiceButton } from './VoiceButton';
import { VoiceCommandDisplay, VoiceExchange } from './VoiceCommandDisplay';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [isListening, setIsListening] = useState(false);
  const [objects, setObjects] = useState<TrackedObject[]>([
    {
      id: '1',
      name: 'House Keys',
      icon: '🔑',
      lastLocation: 'Kitchen counter',
      timestamp: '5 minutes ago',
      status: 'found',
      iconColor: '#3B82F6',
    },
    {
      id: '2',
      name: 'Wallet',
      icon: '👛',
      lastLocation: 'Living room sofa',
      timestamp: '15 minutes ago',
      status: 'missing',
      iconColor: '#8B5CF6',
    },
    {
      id: '3',
      name: 'Phone',
      icon: '📱',
      lastLocation: 'Bedroom nightstand',
      timestamp: '2 hours ago',
      status: 'found',
      iconColor: '#10B981',
    },
    {
      id: '4',
      name: 'ID Card',
      icon: '🪪',
      lastLocation: 'Desk drawer',
      timestamp: '1 day ago',
      status: 'found',
      iconColor: '#F59E0B',
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'a1',
      type: 'warning',
      title: 'Wallet Not Found',
      message: 'Your wallet hasn\'t been located in the last 15 minutes.',
      timestamp: 'Just now',
    },
    {
      id: 'a2',
      type: 'camera',
      title: 'Front Door Camera Active',
      message: 'Motion detected at front entrance.',
      timestamp: '10 minutes ago',
    },
  ]);

  const [voiceExchanges, setVoiceExchanges] = useState<VoiceExchange[]>([
    {
      id: 've1',
      command: 'Where are my keys?',
      response: 'Your house keys were last seen on the kitchen counter 5 minutes ago.',
      timestamp: '5 mins ago',
    },
  ]);

  const handleToggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition after 2 seconds
      setTimeout(() => {
        const commands = [
          {
            command: 'Find my wallet',
            response: 'Searching for your wallet... Last seen on the living room sofa 15 minutes ago. Would you like me to activate the sound alert?',
          },
          {
            command: 'Where is my phone?',
            response: 'Your phone is on the bedroom nightstand. Last detected 2 hours ago.',
          },
          {
            command: 'Did I take my medication?',
            response: 'Yes, you took your medication this morning at 8:30 AM. Your next dose is at 8:00 PM.',
          },
        ];
        
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        setVoiceExchanges([
          {
            id: `ve${Date.now()}`,
            command: randomCommand.command,
            response: randomCommand.response,
            timestamp: 'Just now',
          },
          ...voiceExchanges,
        ]);
        setIsListening(false);
      }, 2500);
    }
  };

  const handleMarkFound = (id: string) => {
    setObjects(objects.map(obj => 
      obj.id === id ? { ...obj, status: 'found' as const } : obj
    ));
    
    // Remove related alert
    const object = objects.find(obj => obj.id === id);
    if (object) {
      setAlerts(alerts.filter(alert => 
        !alert.title.toLowerCase().includes(object.name.toLowerCase())
      ));
    }
  };

  const handleLocate = (id: string) => {
    setObjects(objects.map(obj => 
      obj.id === id ? { ...obj, status: 'searching' as const } : obj
    ));
    
    // Simulate finding the object after 3 seconds
    setTimeout(() => {
      setObjects(objects.map(obj => 
        obj.id === id ? { ...obj, status: 'found' as const, timestamp: 'Just now' } : obj
      ));
    }, 3000);
  };

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleReplay = (text: string) => {
    // In a real app, this would use text-to-speech
    console.log('Replaying:', text);
  };

  const missingCount = objects.filter(obj => obj.status === 'missing').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-green-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white border-b border-white/20 sticky top-0 z-10 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <HomeIcon className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="font-bold text-2xl">Memory Assistant</h1>
                <p className="text-xs text-white/80">Never forget, always safe</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button 
                onClick={() => onNavigate('alerts')}
                className="relative p-2.5 hover:bg-white/20 rounded-xl transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-6 h-6 text-white" />
                {alerts.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full font-bold shadow-lg"
                  >
                    {alerts.length}
                  </motion.div>
                )}
              </motion.button>
              <motion.button 
                onClick={() => onNavigate('settings')}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-24 space-y-6">
        {/* Voice Button Section */}
        <motion.div 
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Gradient background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 opacity-50" />
          <div className="relative z-10">
            <VoiceButton 
              isListening={isListening} 
              onToggleListening={handleToggleListening}
            />
          </div>
        </motion.div>

        {/* Voice Exchanges */}
        {voiceExchanges.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
              Recent Commands
            </h2>
            <VoiceCommandDisplay 
              exchanges={voiceExchanges.slice(0, 3)} 
              onReplay={handleReplay}
            />
          </div>
        )}

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
              Active Alerts
            </h2>
            <AlertNotification alerts={alerts} onDismiss={handleDismissAlert} />
          </div>
        )}

        {/* Tracked Objects Section */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Tracked Items
            </h2>
            {missingCount > 0 && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {missingCount} missing
              </Badge>
            )}
          </div>
          <div className="space-y-3">
            {objects.map((object) => (
              <ObjectCard
                key={object.id}
                object={object}
                onMarkFound={handleMarkFound}
                onLocate={handleLocate}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => onNavigate('phone-recovery')}
            variant="outline"
            className="h-16 flex flex-col gap-1 bg-white hover:bg-gray-50"
          >
            <span className="text-2xl">📱</span>
            <span className="text-sm">Find Phone</span>
          </Button>
          <Button 
            onClick={() => onNavigate('settings')}
            variant="outline"
            className="h-16 flex flex-col gap-1 bg-white hover:bg-gray-50"
          >
            <span className="text-2xl">➕</span>
            <span className="text-sm">Add Item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}