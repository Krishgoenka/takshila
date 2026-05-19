'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AppState {
  introComplete: boolean;
  portalOpen: boolean;
  currentSection: string;
  isMobile: boolean;
}

interface AppStateContextType extends AppState {
  setIntroComplete: () => void;
  setPortalOpen: () => void;
  setCurrentSection: (section: string) => void;
  setIsMobile: (mobile: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    introComplete: false,
    portalOpen: false,
    currentSection: 'intro',
    isMobile: false,
  });

  const setIntroComplete = useCallback(() => {
    setState((prev) => ({ ...prev, introComplete: true, currentSection: 'portal' }));
  }, []);

  const setPortalOpen = useCallback(() => {
    setState((prev) => ({ ...prev, portalOpen: true, currentSection: 'main' }));
  }, []);

  const setCurrentSection = useCallback((section: string) => {
    setState((prev) => ({ ...prev, currentSection: section }));
  }, []);

  const setIsMobile = useCallback((mobile: boolean) => {
    setState((prev) => ({ ...prev, isMobile: mobile }));
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        ...state,
        setIntroComplete,
        setPortalOpen,
        setCurrentSection,
        setIsMobile,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
