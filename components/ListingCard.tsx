
import React, { useContext } from 'react';
import { Listing } from '../types';
import { AppContext, AppContextType } from '../App';
import { LocationPinIcon, BedIcon, MoneyIcon, HeartIcon } from './icons';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { navigateTo, currentUser, bookmarks, toggleBookmark } = useContext(AppContext) as AppContextType;
  const isBookmarked = currentUser ? bookmarks[currentUser.id]?.has(listing.id) ?? false : false;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <div className="relative">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(listing.id);
          }}
          className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-purple-600 transition-colors"
          aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <HeartIcon className={`w-5 h-5 ${isBookmarked ? 'text-purple-600 fill-current' : 'text-gray-500'}`} />
        </button>
      </div>
      <div className="p-4 cursor-pointer" onClick={() => navigateTo('listing-detail', listing)}>
        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">{listing.title}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <LocationPinIcon className="w-4 h-4 mr-1.5 text-gray-400" />
          <span>{listing.location}</span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center text-gray-700">
              <BedIcon className="w-5 h-5 mr-1 text-purple-500" />
              <span>{listing.roomType}</span>
            </div>
          </div>
          <div className="flex items-center">
            <MoneyIcon className="w-5 h-5 mr-1 text-green-500" />
            <span className="text-lg font-bold text-gray-900">${listing.price}</span>
            <span className="text-sm text-gray-500">/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
