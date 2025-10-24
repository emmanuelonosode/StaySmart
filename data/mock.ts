import { User, Listing, Message, Review } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@university.edu',
    role: 'student',
    profilePicture: 'https://picsum.photos/seed/alex/100/100',
    verificationStatus: 'verified'
  },
  {
    id: 2,
    name: 'Barbara Doe',
    email: 'barbara@propertymgmt.com',
    role: 'landlord',
    profilePicture: 'https://picsum.photos/seed/barbara/100/100',
    verificationStatus: 'verified'
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@university.edu',
    role: 'student',
    profilePicture: 'https://picsum.photos/seed/charlie/100/100',
    verificationStatus: 'unverified'
  },
  {
    id: 4,
    name: 'Diana Properties',
    email: 'diana@rentals.com',
    role: 'landlord',
    profilePicture: 'https://picsum.photos/seed/diana/100/100',
    verificationStatus: 'pending'
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 1,
    title: 'Modern 2-Bed near Campus',
    price: 850,
    location: '123 University Ave',
    amenities: ['WiFi', 'Ensuite', 'Kitchen', 'Laundry'],
    isShared: true,
    roomType: 'shared',
    images: ['https://picsum.photos/seed/listing1/800/600', 'https://picsum.photos/seed/listing1a/800/600', 'https://picsum.photos/seed/listing1b/800/600'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    landlordId: 2,
    description: 'A beautiful, fully-furnished apartment just a 5-minute walk from the main campus. Ideal for two students sharing. Comes with all modern amenities.',
    rules: ['No pets', 'No smoking', 'Quiet hours after 10 PM'],
    distanceFromCampus: 0.5
  },
  {
    id: 2,
    title: 'Cozy Studio Room',
    price: 600,
    location: '456 College St',
    amenities: ['WiFi', 'Kitchenette'],
    isShared: false,
    roomType: 'single',
    images: ['https://picsum.photos/seed/listing2/800/600', 'https://picsum.photos/seed/listing2a/800/600'],
    landlordId: 2,
    description: 'Perfect single-person studio for focused study. Compact and affordable, with essential amenities. Great for post-grad students.',
    rules: ['No pets'],
    distanceFromCampus: 1.2
  },
  {
    id: 3,
    title: 'Spacious Self-Contained Unit',
    price: 1200,
    location: '789 Library Walk',
    amenities: ['WiFi', 'Full Kitchen', 'Parking', 'Laundry'],
    isShared: false,
    roomType: 'self-contained',
    images: ['https://picsum.photos/seed/listing3/800/600', 'https://picsum.photos/seed/listing3a/800/600', 'https://picsum.photos/seed/listing3b/800/600'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    landlordId: 2,
    description: 'Live independently in this spacious self-contained unit. Features a private entrance, full kitchen, and dedicated parking space.',
    rules: ['Respectful tenants only'],
    distanceFromCampus: 2.0
  },
    {
    id: 4,
    title: 'Affordable Shared Room',
    price: 450,
    location: '101 Scholar Drive',
    amenities: ['WiFi', 'Shared Kitchen', 'Common Area'],
    isShared: true,
    roomType: 'shared',
    images: ['https://picsum.photos/seed/listing4/800/600', 'https://picsum.photos/seed/listing4a/800/600'],
    landlordId: 4,
    description: 'Budget-friendly option for students. Shared room in a large house with other students. Great way to meet new people!',
    rules: ['Cleanliness is a must', 'No overnight guests without permission'],
    distanceFromCampus: 1.5
  }
];


export const MOCK_MESSAGES: Message[] = [
    {
        id: 1,
        senderId: 1,
        receiverId: 2,
        content: 'Hi there! I am interested in the "Modern 2-Bed near Campus". Is it still available?',
        timestamp: '2024-07-28T10:00:00Z',
    },
    {
        id: 2,
        senderId: 2,
        receiverId: 1,
        content: 'Hello Alex! Yes, it is. Would you like to schedule a viewing?',
        timestamp: '2024-07-28T10:01:00Z',
    },
    {
        id: 3,
        senderId: 1,
        receiverId: 2,
        content: 'That would be great! How about tomorrow afternoon?',
        timestamp: '2024-07-28T10:02:00Z',
    },
];

export const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        landlordId: 2,
        studentId: 1,
        rating: 5,
        comment: 'Barbara was an amazing landlord! Very responsive and helpful with any issues. The apartment was exactly as described. Highly recommend!',
        timestamp: '2024-06-15T14:30:00Z',
    },
    {
        id: 2,
        landlordId: 2,
        studentId: 3,
        rating: 4,
        comment: 'Great location and a fair price. Barbara was professional and addressed maintenance requests quickly. Would rent from her again.',
        timestamp: '2024-05-20T11:00:00Z',
    },
];
