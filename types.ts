export type Role = 'student' | 'landlord';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  profilePicture: string;
  verificationStatus: 'unverified' | 'pending' | 'verified';
}

export interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  amenities: string[];
  isShared: boolean;
  roomType: 'shared' | 'single' | 'self-contained';
  images: string[];
  videoUrl?: string;
  landlordId: number;
  description: string;
  rules: string[];
  distanceFromCampus: number; // in km
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

export interface Review {
  id: number;
  landlordId: number;
  studentId: number;
  rating: number; // 1 to 5
  comment: string;
  timestamp: string;
}
