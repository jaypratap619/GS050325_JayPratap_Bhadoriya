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

// Define the Calender interface
export interface ICalendar {
  week: string;
  weekLabel: string;
  month: string;
  monthLabel: string;
}

// Define the Plan interface
export interface Iplan {
  store: string;
  sku: string;
  week: string;
  salesUnit: number;
}
