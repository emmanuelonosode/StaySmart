
import React, { useState, useCallback, useMemo } from 'react';
import { User, Role, Listing, Message, Review } from './types';
// FIX: Import MOCK_MESSAGES to resolve reference error.
import { MOCK_LISTINGS, MOCK_USERS, MOCK_MESSAGES, MOCK_REVIEWS } from './data/mock';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import LandlordDashboard from './pages/LandlordDashboard';
import ListingDetailPage from './pages/ListingDetailPage';
import PostListingPage from './pages/PostListingPage';
import BookmarksPage from './pages/BookmarksPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';

export type Page = 'landing' | 'auth' | 'student-dashboard' | 'landlord-dashboard' | 'listing-detail' | 'post-listing' | 'edit-listing' | 'bookmarks' | 'messages' | 'profile';

export interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  navigateTo: (page: Page, data?: any) => void;
  listings: Listing[];
  updateListings: (newListings: Listing[]) => void;
  bookmarks: Record<number, Set<number>>;
  toggleBookmark: (listingId: number) => void;
  messages: Message[];
  sendMessage: (content: string, receiverId: number) => void;
  users: User[];
  updateUser: (updatedUser: User) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'timestamp' | 'studentId'>) => void;
}

export const AppContext = React.createContext<AppContextType | null>(null);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [pageData, setPageData] = useState<any>(null);
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [bookmarks, setBookmarks] = useState<Record<number, Set<number>>>({});
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  
  const navigateTo = useCallback((page: Page, data: any = null) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo(0, 0);
  }, []);

  const updateUser = (updatedUser: User) => {
    const newUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(newUsers);
    if (currentUser && currentUser.id === updatedUser.id) {
        setCurrentUser(updatedUser);
    }
  };

  const addReview = (review: Omit<Review, 'id' | 'timestamp' | 'studentId'>) => {
    if (!currentUser) return;
    const newReview: Review = {
        ...review,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        studentId: currentUser.id,
    };
    setReviews(prev => [...prev, newReview]);
  };

  const toggleBookmark = (listingId: number) => {
    if (!currentUser) {
        navigateTo('auth');
        return;
    }
    setBookmarks(prev => {
        const userBookmarks = new Set(prev[currentUser.id] || []);
        if (userBookmarks.has(listingId)) {
            userBookmarks.delete(listingId);
        } else {
            userBookmarks.add(listingId);
        }
        return {
            ...prev,
            [currentUser.id]: userBookmarks,
        };
    });
  };

  const sendMessage = (content: string, receiverId: number) => {
    if (!currentUser) return;

    const newMessage: Message = {
        id: Date.now(),
        senderId: currentUser.id,
        receiverId: receiverId,
        content: content,
        timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate a reply from the landlord/student after 1.5s to mimic real-time
    setTimeout(() => {
        const replyUser = users.find(u => u.id === receiverId);
        const replyMessage: Message = {
            id: Date.now() + 1,
            senderId: receiverId,
            receiverId: currentUser.id,
            content: `Hi, this is ${replyUser?.name}. Thanks for your message! I'll review it and get back to you shortly.`,
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, replyMessage]);
    }, 1500);
  };

  const handleLogin = (email: string, role: Role) => {
      let user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
      if (user) {
        setCurrentUser(user);
        navigateTo(role === 'student' ? 'student-dashboard' : 'landlord-dashboard');
      } else {
        // For demo, create a new user if not found
        const newUser: User = {
            id: users.length + 1,
            name: email.split('@')[0],
            email: email,
            role: role,
            profilePicture: `https://picsum.photos/seed/${email}/100/100`,
            verificationStatus: 'unverified'
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        navigateTo(role === 'student' ? 'student-dashboard' : 'landlord-dashboard');
      }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo('landing');
  };

  const updateListings = (newListings: Listing[]) => {
    setListings(newListings);
  }

  const contextValue = useMemo(() => ({
    currentUser,
    setCurrentUser: handleLogin as any, // Simplified for demo
    navigateTo,
    listings,
    updateListings,
    bookmarks,
    toggleBookmark,
    messages,
    sendMessage,
    users,
    updateUser,
    reviews,
    addReview,
  }), [currentUser, navigateTo, listings, bookmarks, messages, users, reviews]);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'landlord-dashboard':
        return <LandlordDashboard />;
      case 'listing-detail':
        return <ListingDetailPage listing={pageData} />;
      case 'post-listing':
        return <PostListingPage />;
       case 'edit-listing':
        return <PostListingPage existingListing={pageData} />;
      case 'bookmarks':
        return <BookmarksPage />;
      case 'messages':
        return <MessagesPage recipientId={pageData?.recipientId} />;
      case 'profile':
        return <ProfilePage userId={pageData?.userId} />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Header onLogout={handleLogout} />
        <main className="pt-16">
          {renderPage()}
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;