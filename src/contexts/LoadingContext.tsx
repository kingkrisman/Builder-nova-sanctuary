import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setLoadingMessage: (message: string) => void;
}

const INTRO_KEY = "dasayonce:intro-seen";

// The full-screen loader is an intro, shown once per browser session on the first page load.
// Storage can throw (private mode, blocked site data), in which case we just skip the intro.
export function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return true;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // ignore
  }
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(() => !hasSeenIntro());
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const startLoading = useCallback((message = "Loading...") => {
    setLoadingMessage(message);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const updateLoadingMessage = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        startLoading,
        stopLoading,
        setLoadingMessage: updateLoadingMessage,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
