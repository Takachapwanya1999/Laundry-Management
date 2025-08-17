import { createContext } from 'react';
import type { Branch } from './BranchTypes';

export type BranchContextType = {
  branch: Branch;
  setBranch: (b: Branch) => void;
};

export const BranchContext = createContext<BranchContextType | undefined>(undefined);

export type { Branch };
