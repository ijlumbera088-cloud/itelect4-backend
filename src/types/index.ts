export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

export interface Submission {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'LOST' | 'FOUND';
  location: string;
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  imageUrl?: string | null;
  createdAt: string;
  resolved: boolean;
  resolvedAt?: string | null;
}

export interface AuthPayload {
  userId: number;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message: string;
}

export type CreateSubmissionDto = Omit<Submission, 'id' | 'createdAt' | 'resolved' | 'resolvedAt'>;
export type UpdateSubmissionDto = Partial<CreateSubmissionDto>;
