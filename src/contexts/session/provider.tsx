import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SWILE_TOKEN_LS_KEY } from "@/data/swile/constants";

export type SessionProviderProps = PropsWithChildren;

export type SessionProviderResult = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isLoading: boolean;
};

export const SessionContext = createContext<SessionProviderResult | null>(null);

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem(SWILE_TOKEN_LS_KEY));
    setIsLoading(false);
  }, []);

  const setTokenWithCache = useCallback((token: string) => {
    setToken(token);
    localStorage.setItem(SWILE_TOKEN_LS_KEY, token);
  }, []);

  const clearToken = useCallback(() => {
    setToken(null);
    localStorage.removeItem(SWILE_TOKEN_LS_KEY);
  }, []);

  const value = useMemo(
    () => ({ token, setToken: setTokenWithCache, clearToken, isLoading }),
    [token, setTokenWithCache, clearToken, isLoading],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
