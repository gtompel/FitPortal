'use client';

import { useState, useEffect } from 'react';

export default function InstallPWAButton() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptEvent, setPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice.then((choice: any) => {
        if (choice.outcome === 'accepted') {
          console.log('PWA установлено');
        }
        setPromptEvent(null);
      });
    }
  };

  if (!supportsPWA) return null;

  return (
    <button onClick={handleInstall} className="install-button">
      📲 Установить FitPortal
    </button>
  );
}