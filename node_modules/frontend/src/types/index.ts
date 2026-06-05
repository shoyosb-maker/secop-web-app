// frontend/src/types/index.ts

export interface Process {
  id: string;
  reference: string;
  entity: string;
  title: string;
  base_value: number;
  status: string;
  publication_date: string;
  unspsc_code?: string;
  unspsc_additional?: string;
  description?: string;
  modality?: string;
  phase?: string;
  deadline?: string;
  url?: string;
}

export interface Alert {
  id: string;
  name: string;
  query: string;
  filters: {
    entity_name?: string;
    department?: string;
    city?: string;
    modality?: string;
    phase?: string;
    status?: string;
    min_value?: number;
    max_value?: number;
  };
  createdAt: string;
  lastChecked: string;
  lastResultCount: number;
}

export interface SearchFilters {
  entity_name: string;
  department: string;
  city: string;
  from_date: string;
  to_date: string;
  min_value: string;
  max_value: string;
  modality: string;
  phase: string;
  status: string;
}

export interface Notification {
  alertId: string;
  message: string;
}