
import React, { useContext, useState, useMemo } from 'react';
import { AppContext, AppContextType } from '../App';
import ListingCard from '../components/ListingCard';

const StudentDashboard: React.FC = () => {
  const { listings } = useContext(AppContext) as AppContextType;
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(1500);
  const [roomType, setRoomType] = useState('all');

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
        const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || listing.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = listing.price <= priceRange;
        const matchesRoomType = roomType === 'all' || listing.roomType === roomType;
        return matchesSearch && matchesPrice && matchesRoomType;
    });
  }, [listings, searchTerm, priceRange, roomType]);

  return (
    <div className="bg-gray-50">
        {/* Search and Filter Bar */}
      <div className="sticky top-16 bg-gray-50/90 backdrop-blur-sm z-40 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                 <div className="md:col-span-2">
                    <input
                        type="text"
                        placeholder="Find a room by title or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700">Max Price: ${priceRange}</label>
                     <input
                        type="range"
                        min="300"
                        max="2000"
                        step="50"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Room Type</label>
                    <select
                         value={roomType}
                         onChange={(e) => setRoomType(e.target.value)}
                         className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    >
                        <option value="all">All</option>
                        <option value="shared">Shared</option>
                        <option value="single">Single</option>
                        <option value="self-contained">Self-contained</option>
                    </select>
                </div>
            </div>
        </div>
      </div>
      
      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Rooms</h1>
        {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
            </div>
        ) : (
             <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-800">No matching listings found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find your perfect room.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
