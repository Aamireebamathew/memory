import { MapPin, Clock, CheckCircle, Locate } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface TrackedObject {
  id: string;
  name: string;
  icon: string;
  lastLocation: string;
  timestamp: string;
  status: 'found' | 'missing' | 'searching';
  iconColor: string;
}

interface ObjectCardProps {
  object: TrackedObject;
  onMarkFound: (id: string) => void;
  onLocate: (id: string) => void;
}

export function ObjectCard({ object, onMarkFound, onLocate }: ObjectCardProps) {
  const statusColors = {
    found: 'bg-green-100 text-green-700 border-green-200',
    missing: 'bg-amber-100 text-amber-700 border-amber-200',
    searching: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'found': return 'Found';
      case 'missing': return 'Missing';
      case 'searching': return 'Searching';
      default: return 'Unknown';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: object.iconColor + '20' }}
        >
          {object.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg text-gray-900">{object.name}</h3>
            <Badge 
              variant="outline" 
              className={`${statusColors[object.status]} border text-xs font-medium px-2 py-1`}
            >
              {getStatusText(object.status)}
            </Badge>
          </div>
          
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="truncate">{object.lastLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>{object.timestamp}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {object.status !== 'found' && (
              <>
                <Button 
                  onClick={() => onMarkFound(object.id)}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9"
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  Mark Found
                </Button>
                <Button 
                  onClick={() => onLocate(object.id)}
                  size="sm"
                  className="flex-1 h-9 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90"
                >
                  <Locate className="w-4 h-4 mr-1.5" />
                  Locate
                </Button>
              </>
            )}
            {object.status === 'found' && (
              <Button 
                onClick={() => onLocate(object.id)}
                variant="outline"
                size="sm"
                className="w-full h-9"
              >
                <MapPin className="w-4 h-4 mr-1.5" />
                View Location
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
