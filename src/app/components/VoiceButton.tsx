import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'motion/react';

interface VoiceButtonProps {
  onVoiceCommand?: (command: string) => void;
  isListening: boolean;
  onToggleListening: () => void;
}

export function VoiceButton({ onVoiceCommand, isListening, onToggleListening }: VoiceButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isListening && (
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Listening...
          </p>
          <p className="text-xs text-muted-foreground">Speak your command</p>
        </div>
      )}
      
      <motion.button
        onClick={onToggleListening}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl ${
          isListening 
            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 text-white' 
            : 'bg-white border-4 border-transparent bg-clip-padding'
        }`}
        style={!isListening ? {
          backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #3B82F6, #8B5CF6, #10B981)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        } : {}}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        animate={isListening ? { scale: [1, 1.05, 1] } : {}}
        transition={{ repeat: isListening ? Infinity : 0, duration: 1.5 }}
      >
        <Mic className={`w-12 h-12 ${isListening ? 'text-white' : 'text-purple-600'}`} />
        
        {isListening && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-400"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-blue-400"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-green-400"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
            />
          </>
        )}
      </motion.button>
      
      {!isListening && (
        <p className="text-sm text-muted-foreground font-medium">Tap to speak</p>
      )}
    </div>
  );
}