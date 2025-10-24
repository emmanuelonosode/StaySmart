
import React, { useContext, useMemo } from 'react';
import { AppContext, AppContextType } from '../App';
import ListingCard from '../components/ListingCard';

const BookmarksPage: React.FC = () => {
  const { currentUser, listings, bookmarks, navigateTo } = useContext(AppContext) as AppContextType;

  const bookmarkedListings = useMemo(() => {
    if (!currentUser || !bookmarks[currentUser.id]) {
      return [];
    }
    const bookmarkedIds = bookmarks[currentUser.id];
    return listings.filter(listing => bookmarkedIds.has(listing.id));
  }, [currentUser, listings, bookmarks]);

  if (!currentUser) {
    // Should ideally not happen if routed correctly, but as a fallback
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Please log in to see your bookmarks.</h2>
            <button onClick={() => navigateTo('auth')} className="mt-4 text-purple-600 hover:underline">
                Sign In
            </button>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Bookmarks</h1>
      {bookmarkedListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">You haven't saved any listings yet.</h3>
          <p className="text-gray-500 mt-2">Click the heart icon on any listing to save it here.</p>
          <button
            onClick={() => navigateTo('student-dashboard')}
            className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
          >
            Browse Listings
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
