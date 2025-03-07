// Define the Store interface
export interface IStore {
  id: string;
  label: string;
  city: string;
  state: string;
}

// Define the SKU interface
export interface ISKU {
  id: string;
  label: string;
  class: string;
  department: string;
  price: number;
  cost: number;
}
