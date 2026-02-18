import { ArrowLeft, MapPin, Navigation, Volume2, Smartphone, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface PhoneRecoveryProps {
  onNavigate: (screen: string) => void;
}

export function PhoneRecovery({ onNavigate }: PhoneRecoveryProps) {
  const handlePlaySound = () => {
    // In real app, would trigger phone sound
    console.log('Playing sound on phone...');
  };

  const handleGetDirections = () => {
    // In real app, would open map with directions
    console.log('Opening directions...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white border-b border-white/20 sticky top-0 z-10 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
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
              <h1 className="font-bold text-xl">Find My Phone</h1>
              <p className="text-xs text-white/80">Locate your device</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Phone Status Card */}
        <motion.div 
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">iPhone 14 Pro</h2>
          <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Online</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last seen: 2 hours ago</span>
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div 
          className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
            {/* Simple map representation */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 rounded-full blur-2xl" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-300 rounded-full blur-2xl" />
            </div>
            
            {/* Location pin */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <MapPin className="w-12 h-12 text-red-500 fill-red-500" />
            </motion.div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Bedroom nightstand</p>
                <p className="text-sm text-gray-500 mt-0.5">123 Main Street, Apt 4B</p>
                <p className="text-xs text-gray-400 mt-1">Accuracy: 5 meters</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={handlePlaySound}
            className="w-full h-16 text-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            size="lg"
          >
            <Volume2 className="w-6 h-6 mr-2" />
            Play Sound
          </Button>

          <Button
            onClick={handleGetDirections}
            variant="outline"
            className="w-full h-16 text-lg bg-white hover:bg-gray-50"
            size="lg"
          >
            <Navigation className="w-6 h-6 mr-2" />
            Get Directions
          </Button>
        </motion.div>

        {/* Info Card */}
        <motion.div 
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-blue-900 mb-2">Tips for finding your phone:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2">
              <span>•</span>
              <span>Use "Play Sound" to hear a loud ring even if your phone is on silent</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Check the last known location on the map above</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Ask your voice assistant: "Where is my phone?"</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}