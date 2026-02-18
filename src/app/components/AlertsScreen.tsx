import { ArrowLeft, Volume2, Filter, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { AlertNotification, Alert } from './AlertNotification';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface AlertsScreenProps {
  onNavigate: (screen: string) => void;
}

export function AlertsScreen({ onNavigate }: AlertsScreenProps) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'a1',
      type: 'warning',
      title: 'Wallet Not Found',
      message: 'Your wallet hasn\'t been located in the last 15 minutes. Last seen on living room sofa.',
      timestamp: 'Just now',
    },
    {
      id: 'a2',
      type: 'camera',
      title: 'Front Door Camera Active',
      message: 'Motion detected at front entrance. Review footage in the security section.',
      timestamp: '10 minutes ago',
    },
    {
      id: 'a3',
      type: 'urgent',
      title: 'Medication Reminder',
      message: 'Time to take your evening medication. Don\'t forget!',
      timestamp: '30 minutes ago',
    },
    {
      id: 'a4',
      type: 'info',
      title: 'Keys Located',
      message: 'Your house keys have been found on the kitchen counter.',
      timestamp: '1 hour ago',
    },
    {
      id: 'a5',
      type: 'warning',
      title: 'Low Battery - Smart Tag',
      message: 'The smart tag attached to your wallet has low battery. Replace soon.',
      timestamp: '2 hours ago',
    },
    {
      id: 'a6',
      type: 'camera',
      title: 'Unusual Activity Detected',
      message: 'Back door camera detected movement. This might be a delivery.',
      timestamp: '3 hours ago',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'urgent' | 'warning' | 'camera' | 'info'>('all');

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all alerts?')) {
      setAlerts([]);
    }
  };

  const handleReplayAll = () => {
    console.log('Replaying all alerts via voice...');
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const filterCounts = {
    all: alerts.length,
    urgent: alerts.filter(a => a.type === 'urgent').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    camera: alerts.filter(a => a.type === 'camera').length,
    info: alerts.filter(a => a.type === 'info').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('dashboard')}
                className="h-10 w-10 p-0 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-bold text-xl">Alerts & Notifications</h1>
                <p className="text-xs text-white/80">
                  {alerts.length} active {alerts.length === 1 ? 'alert' : 'alerts'}
                </p>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { value: 'all', label: 'All', count: filterCounts.all },
              { value: 'urgent', label: 'Urgent', count: filterCounts.urgent },
              { value: 'warning', label: 'Warning', count: filterCounts.warning },
              { value: 'camera', label: 'Camera', count: filterCounts.camera },
              { value: 'info', label: 'Info', count: filterCounts.info },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  filter === item.value
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                {item.count > 0 && (
                  <Badge className={`${
                    filter === item.value
                      ? 'bg-purple-100 text-purple-700 border-purple-200'
                      : 'bg-white/30 text-white border-white/30'
                  } h-5 px-2 text-xs`}>
                    {item.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-24 space-y-4">
        {/* Action Buttons */}
        {alerts.length > 0 && (
          <motion.div 
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={handleReplayAll}
              variant="outline"
              className="h-12 bg-white hover:bg-gray-50 border-2"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Replay All
            </Button>
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="h-12 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 border-2"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </motion.div>
        )}

        {/* Alerts List */}
        {filteredAlerts.length > 0 ? (
          <AlertNotification alerts={filteredAlerts} onDismiss={handleDismiss} />
        ) : (
          <motion.div
            className="bg-white rounded-3xl p-12 text-center shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'You have no active alerts at the moment.' 
                : `No ${filter} alerts at the moment.`}
            </p>
          </motion.div>
        )}

        {/* Info Card */}
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Alert Settings
          </h3>
          <p className="text-sm text-blue-800 mb-3">
            Customize your notification preferences in Settings to control which alerts you receive.
          </p>
          <Button
            onClick={() => onNavigate('settings')}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-blue-50 border-blue-200"
          >
            Go to Settings
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
