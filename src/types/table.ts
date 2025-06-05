// table.ts
export interface TableColumn {
  name: string;
  label: string;
  type?: 'text' | 'url' | 'badge' | 'percentage' | 'image' | 'action' | 'imageText' | 'rating';
  sortable?: boolean;
  filterable?: boolean;
  style?: string;
  colored?: boolean;
  event?: string;

  actions?: Array<{
    name: string;
    event: string;
    icone: string;
    color?: string;
  }>;

  inputField?: {
    type: string;
    placeholder: string;
  };
}
