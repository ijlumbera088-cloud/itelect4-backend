import { Submission, User } from '../types/index.js';

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'STUDENT',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'STUDENT',
    createdAt: new Date().toISOString(),
  },
];

export const submissions: Submission[] = [
  {
    id: 1,
    title: 'Blue Umbrella',
    description: 'Blue umbrella with a silver handle found near the library entrance.',
    category: 'Accessories',
    status: 'FOUND',
    location: 'Library Entrance',
    userId: 2,
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    userPhone: '09123456789',
    imageUrl: null,
    createdAt: new Date().toISOString(),
    resolved: false,
    resolvedAt: null,
  },
  {
    id: 2,
    title: 'Student ID',
    description: 'Student ID card with name Ian Lumbera, lost in the CBEAM building.',
    category: 'Documents',
    status: 'LOST',
    location: 'CBEAM Building',
    userId: 1,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userPhone: '09987654321',
    imageUrl: null,
    createdAt: new Date().toISOString(),
    resolved: false,
    resolvedAt: null,
  },
];

export const nextUserId = () => users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
export const nextSubmissionId = () => submissions.reduce((max, item) => Math.max(max, item.id), 0) + 1;
