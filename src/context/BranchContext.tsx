import React, { useEffect, useMemo, useState } from 'react';
import type { Branch } from './BranchTypes';
import { BranchContext } from './BranchContextInternal';

export const BranchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branch, setBranchState] = useState<Branch>('Downtown');

  useEffect(() => {
    const saved = localStorage.getItem('branch');
    if (saved === 'Downtown' || saved === 'Uptown' || saved === 'Airport') {
      setBranchState(saved);
    }
  }, []);

  const setBranch = (b: Branch) => {
    setBranchState(b);
    localStorage.setItem('branch', b);
  };

  const value = useMemo(() => ({ branch, setBranch }), [branch]);

  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>;
};

// Moved useBranch to a separate file to satisfy react-refresh rule

// Types moved to BranchTypes.ts to keep this file exporting only components/hooks
