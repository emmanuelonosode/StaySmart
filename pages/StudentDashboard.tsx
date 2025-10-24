import React, { useContext, useState, useMemo } from 'react';
import { AppContext, AppContextType } from '../App';
import ListingCard from '../components/ListingCard';

const StudentDashboard: React.FC = () => {
  const { listings, currentUser } = useContext(AppContext) as AppContextType;
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
  
  const nearCampusListings = useMemo(() => filteredListings.filter(l => l.distanceFromCampus < 1), [filteredListings]);
  const allOtherListings = useMemo(() => filteredListings, [filteredListings]);

  return (
    <div className="bg-gray-50 min-h-full">
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Welcome, {currentUser?.name.split(' ')[0]}!</h1>
                <p className="text-lg text-gray-600 mt-1">Find your next home away from home.</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-white/70">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-2">
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Price: <span className="font-bold text-purple-600">${priceRange}</span></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                        <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition"
                        >
                            <option value="all">All</option>
                            <option value="shared">Shared</option>
                            <option value="single">Single</option>
                            <option value="self-contained">Self-contained</option>
                        </select>
                    </div>
                </div>
            </div>
      
            {/* Listings Sections */}
            <div className="mt-8">
                {nearCampusListings.length > 0 && (
                    <section className="mb-12">
                         <h2 className="text-2xl font-bold text-gray-800 mb-4">Just a Walk Away</h2>
                         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {nearCampusListings.map(listing => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">All Listings</h2>
                    {allOtherListings.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {allOtherListings.map(listing => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800">No matching listings found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters to find your perfect room.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    </div>
  );
};

export default StudentDashboard;