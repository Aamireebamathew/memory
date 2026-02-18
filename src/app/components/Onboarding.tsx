import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MapPin, Bell, Shield, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Mic,
    iconColor: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-100 via-purple-50 to-blue-100',
    title: 'Voice-Activated Assistant',
    description: 'Simply speak to find your belongings. Ask "Where are my keys?" and get instant answers.',
    illustration: '🎤',
  },
  {
    icon: MapPin,
    iconColor: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-100 via-pink-50 to-purple-100',
    title: 'Track Your Items',
    description: 'Keep tabs on your keys, wallet, phone, and important items with real-time location tracking.',
    illustration: '📍',
  },
  {
    icon: Bell,
    iconColor: 'from-orange-500 to-orange-600',
    bgGradient: 'from-orange-100 via-yellow-50 to-orange-100',
    title: 'Smart Alerts',
    description: 'Get notified when items are left behind or when unusual activity is detected at home.',
    illustration: '🔔',
  },
  {
    icon: Shield,
    iconColor: 'from-green-500 to-green-600',
    bgGradient: 'from-green-100 via-emerald-50 to-green-100',
    title: 'Privacy & Safety First',
    description: 'Your data is secure and private. Camera alerts and location data stay on your device.',
    illustration: '🛡️',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip button */}
      <div className="p-4 flex justify-end">
        <Button 
          variant="ghost" 
          onClick={handleSkip}
          className="text-gray-600 hover:text-gray-900"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md text-center"
          >
            {/* Illustration */}
            <motion.div
              className={`w-64 h-64 mx-auto mb-8 rounded-[3rem] bg-gradient-to-br ${slides[currentSlide].bgGradient} flex items-center justify-center shadow-lg`}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            >
              <motion.div
                className="text-8xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                {slides[currentSlide].illustration}
              </motion.div>
            </motion.div>

            {/* Icon */}
            <motion.div
              className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${slides[currentSlide].iconColor} flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-8 h-8 text-white" />;
              })()}
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {slides[currentSlide].title}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 space-y-6">
        {/* Dots */}
        <div className="flex gap-2 justify-center">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          onClick={handleNext}
          className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 shadow-lg"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
