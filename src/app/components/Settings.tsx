import { 
  ArrowLeft, 
  Plus, 
  Bluetooth, 
  Camera, 
  Bell, 
  Shield, 
  Moon, 
  Volume2,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { motion } from 'motion/react';
import { useState } from 'react';

interface SettingsProps {
  onNavigate: (screen: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const registeredObjects = [
    { id: '1', name: 'House Keys', icon: '🔑' },
    { id: '2', name: 'Wallet', icon: '👛' },
    { id: '3', name: 'Phone', icon: '📱' },
    { id: '4', name: 'ID Card', icon: '🪪' },
  ];

  const connectedDevices = [
    { id: '1', name: 'Apple Watch Series 8', connected: true },
    { id: '2', name: 'AirPods Pro', connected: true },
    { id: '3', name: 'Smart Tag', connected: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white border-b border-white/20 sticky top-0 z-10 shadow-lg">
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
              <h1 className="font-bold text-xl">Settings</h1>
              <p className="text-xs text-white/80">Manage your preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-24 space-y-6">
        {/* Registered Objects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Registered Objects
            </h2>
            <Button size="sm" variant="ghost" className="h-8 text-blue-600 hover:text-blue-700">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {registeredObjects.map((object) => (
              <div key={object.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{object.icon}</span>
                  <span className="font-medium text-gray-900">{object.name}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Connected Devices Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Connected Devices
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {connectedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    device.connected ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Bluetooth className={`w-5 h-5 ${
                      device.connected ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{device.name}</p>
                    <p className={`text-xs ${
                      device.connected ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {device.connected ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
            <button className="w-full p-4 text-left flex items-center gap-3 text-blue-600 hover:bg-blue-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium">Add New Device</span>
            </button>
          </div>
        </motion.div>

        {/* Privacy & Safety Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Privacy & Safety
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Camera Access</p>
                  <p className="text-xs text-gray-500">For safety monitoring</p>
                </div>
              </div>
              <Switch checked={cameraEnabled} onCheckedChange={setCameraEnabled} />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Alert Notifications</p>
                  <p className="text-xs text-gray-500">Push notifications</p>
                </div>
              </div>
              <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Voice Commands</p>
                  <p className="text-xs text-gray-500">Always listening</p>
                </div>
              </div>
              <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
            </div>

            <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Privacy Settings</p>
                  <p className="text-xs text-gray-500">Data & permissions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
            Appearance
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-500">Reduce eye strain</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
        >
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-800 mb-3">
            Learn how to use voice commands and set up your safety system.
          </p>
          <Button variant="outline" size="sm" className="bg-white hover:bg-blue-50 border-blue-200">
            View Tutorial
          </Button>
        </motion.div>
      </div>
    </div>
  );
}