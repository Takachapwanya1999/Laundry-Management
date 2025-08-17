import { useContext } from 'react';
import { BranchContext } from './BranchContextInternal';

export const useBranch = () => {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error('useBranch must be used within BranchProvider');
  return ctx;
};
