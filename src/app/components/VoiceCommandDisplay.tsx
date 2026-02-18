import { motion, AnimatePresence } from 'motion/react';
import { User, Bot, Volume2 } from 'lucide-react';
import { Button } from './ui/button';

export interface VoiceExchange {
  id: string;
  command: string;
  response: string;
  timestamp: string;
}

interface VoiceCommandDisplayProps {
  exchanges: VoiceExchange[];
  onReplay?: (text: string) => void;
}

export function VoiceCommandDisplay({ exchanges, onReplay }: VoiceCommandDisplayProps) {
  if (exchanges.length === 0) return null;

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {exchanges.map((exchange) => (
          <motion.div
            key={exchange.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {/* User Command */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 bg-blue-50 rounded-2xl rounded-tl-sm p-3 border border-blue-100">
                <p className="text-sm text-gray-800">{exchange.command}</p>
              </div>
            </div>

            {/* System Response */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="bg-emerald-50 rounded-2xl rounded-tl-sm p-3 border border-emerald-100">
                  <p className="text-sm text-gray-800">{exchange.response}</p>
                </div>
                <div className="flex items-center gap-2 mt-1.5 px-2">
                  <span className="text-xs text-gray-400">{exchange.timestamp}</span>
                  {onReplay && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onReplay(exchange.response)}
                      className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                    >
                      <Volume2 className="w-3 h-3 mr-1" />
                      Replay
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
