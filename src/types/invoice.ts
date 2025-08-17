export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue';

export type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  id: number;
  customerName: string;
  branch: 'Downtown' | 'Uptown' | 'Airport';
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
};
