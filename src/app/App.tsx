import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPassword } from './components/ForgotPassword';
import { Dashboard } from './components/Dashboard';
import { AlertsScreen } from './components/AlertsScreen';
import { PhoneRecovery } from './components/PhoneRecovery';
import { Settings } from './components/Settings';

type Screen = 
  | 'splash' 
  | 'onboarding' 
  | 'login' 
  | 'register' 
  | 'forgot-password' 
  | 'dashboard' 
  | 'alerts' 
  | 'phone-recovery' 
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  return (
    <div className="font-sans antialiased">
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
      )}
      
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={() => setCurrentScreen('login')} />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'register' && (
        <RegisterScreen onRegister={handleRegister} onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'forgot-password' && (
        <ForgotPassword onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'alerts' && (
        <AlertsScreen onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'phone-recovery' && (
        <PhoneRecovery onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'settings' && (
        <Settings onNavigate={handleNavigate} />
      )}
    </div>
  );
}
