import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HistoryItem {
  id: string;
  type: 'idea' | 'chat';
  content: string;
  timestamp: Date;
}

interface HistoryContextType {
  history: HistoryItem[];
  addHistoryItem: (type: 'idea' | 'chat', content: string) => void;
  deleteHistoryItem: (id: string) => void;
}

const HistoryContext = createContext<HistoryContextType | null>(null);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      type: 'idea',
      content: 'An app that helps users find local farmers markets',
      timestamp: new Date(2023, 3, 15)
    },
    {
      id: '2',
      type: 'chat',
      content: 'Discussion about marketing strategies for B2B SaaS',
      timestamp: new Date(2023, 3, 14)
    },
    {
      id: '3',
      type: 'idea',
      content: 'AI-powered recipe generator based on ingredients you have',
      timestamp: new Date(2023, 3, 12)
    },
    {
      id: '4',
      type: 'chat',
      content: 'How to validate my startup idea',
      timestamp: new Date(2023, 3, 10)
    }
  ]);

  const addHistoryItem = (type: 'idea' | 'chat', content: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setHistory(prevHistory => [newItem, ...prevHistory]);
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, deleteHistoryItem }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext; 