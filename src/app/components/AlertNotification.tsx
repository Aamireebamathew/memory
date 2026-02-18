import { AlertTriangle, Camera, Bell, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

export interface Alert {
  id: string;
  type: 'warning' | 'urgent' | 'info' | 'camera';
  title: string;
  message: string;
  timestamp: string;
}

interface AlertNotificationProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export function AlertNotification({ alerts, onDismiss }: AlertNotificationProps) {
  const getAlertStyle = (type: Alert['type']) => {
    switch (type) {
      case 'urgent':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
          iconBg: 'bg-red-100',
          text: 'text-red-900',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200',
          icon: <Bell className="w-5 h-5 text-amber-600" />,
          iconBg: 'bg-amber-100',
          text: 'text-amber-900',
        };
      case 'camera':
        return {
          bg: 'bg-purple-50 border-purple-200',
          icon: <Camera className="w-5 h-5 text-purple-600" />,
          iconBg: 'bg-purple-100',
          text: 'text-purple-900',
        };
      default:
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: <Info className="w-5 h-5 text-blue-600" />,
          iconBg: 'bg-blue-100',
          text: 'text-blue-900',
        };
    }
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {alerts.map((alert) => {
          const style = getAlertStyle(alert.type);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`${style.bg} border rounded-xl p-4 shadow-sm`}
            >
              <div className="flex gap-3">
                <div className={`${style.iconBg} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                  {style.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`font-semibold ${style.text}`}>{alert.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDismiss(alert.id)}
                      className="h-6 w-6 p-0 hover:bg-white/50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className={`text-sm ${style.text} opacity-80 mb-2`}>{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.timestamp}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
