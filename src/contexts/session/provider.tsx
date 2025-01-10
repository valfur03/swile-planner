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
};

export const SessionContext = createContext<SessionProviderResult | null>(null);

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem(SWILE_TOKEN_LS_KEY));
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
    () => ({ token, setToken: setTokenWithCache, clearToken }),
    [token, setTokenWithCache, clearToken],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
