import { useState, useContext, createContext } from 'react';

type SelectedOptionContextType = {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

const SelectedOptionContext = createContext<SelectedOptionContextType | undefined>(undefined);

export function SelectedOptionProvider({ children }: { children: React.ReactNode }) {
  const [selectedOption, setSelectedOption] = useState('1d');

  return (
    <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </SelectedOptionContext.Provider>
  );
}

export function useSelectedOption() {
  const context = useContext(SelectedOptionContext);
  if (context === undefined) {
    throw new Error('useSelectedOption must be used within a SelectedOptionProvider');
  }
  return context;
}
