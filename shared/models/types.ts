// User types
export interface User {
  id: string;
  email: string;
  username?: string;
  created_at: string;
  auth_provider?: string;
}

export interface UserProfile {
  user_id: string;
  shipping_address?: string;
  phone_number?: string;
  full_name?: string;
  updated_at: string;
}

// MUVER types
export interface Muver {
  id: string;
  parent_muver_id?: string;
  join_date: string;
  level: string;
  points: number;
  sales_personal: number;
  sales_team: number;
}

export interface MuverMetrics {
  level: string;
  points: number;
  sales_personal: number;
  sales_team: number;
  updated_at: string;
}

export interface Downline {
  muver_id: string;
  level: string;
  join_date: string;
}

export interface NetworkHierarchy {
  muver_id: string;
  downline: Downline[];
}

// Event types
export enum EventType {
  LIVE = 'live',
  ONLINE = 'online'
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: EventType;
  location?: string;
  zoom_link?: string;
  created_by_muver_id: string;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  muver_id: string;
  registered_at: string;
}

// Content types
export enum ContentType {
  SHORT = 'short',
  LONG = 'long',
  PDF = 'pdf'
}

export interface Content {
  id: string;
  title: string;
  body?: string;
  type: ContentType;
  file_url?: string;
  created_at: string;
  updated_at: string;
}

// Transaction types
export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  status: TransactionStatus;
  created_at: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
