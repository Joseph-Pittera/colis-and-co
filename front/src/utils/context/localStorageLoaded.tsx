import { createContext, useState } from "react";

interface LocalStorageLoadedContextType {
  localStorageLoaded: boolean;
  setLocalStorageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LocalStorageLoadedContext =
  createContext<LocalStorageLoadedContextType>({
    localStorageLoaded: false,
    setLocalStorageLoaded: () => {},
  });

interface LocalStorageLoadedProviderProps {
  children: React.ReactNode;
}

export const LocalStorageLoadedProvider = ({
  children,
}: LocalStorageLoadedProviderProps) => {
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);

  return (
    <LocalStorageLoadedContext.Provider
      value={{ localStorageLoaded, setLocalStorageLoaded }}
    >
      {children}
    </LocalStorageLoadedContext.Provider>
  );
};
