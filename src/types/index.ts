export type UserStatus = 'Базовый' | 'Студент' | 'Юр. Лицо' | 'Депутат';

export interface User {
  name: string;
  status: UserStatus;
  requests_used: number;
  requests_limit: number;
  photo: string | null;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  success: boolean;
}

export interface UpdateProfileResponse {
  success: boolean;
}

export interface Source {
  id: number;
  title: string;
  content: string;
}

export interface QueryResponse {
  answer: string;
  sources: Source[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  sources?: Source[];
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}
