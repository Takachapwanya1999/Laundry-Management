export type Customer = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  tags?: string[];
  ltv?: number;
  lastActivity?: string;
  branch?: string;
};

export type CustomerOrder = {
  id: number;
  title: string;
  status: 'Received' | 'In Progress' | 'Ready' | 'Delivered';
  date: string;
  total: number;
};
