import React, { useContext } from 'react';
import { Listing, User } from '../types';
import { AppContext, AppContextType } from '../App';
import { LocationPinIcon, BedIcon, MoneyIcon, HeartIcon, ShieldCheckIcon } from './icons';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { navigateTo, currentUser, bookmarks, toggleBookmark, users } = useContext(AppContext) as AppContextType;
  const isBookmarked = currentUser ? bookmarks[currentUser.id]?.has(listing.id) ?? false : false;
  const landlord = users.find(u => u.id === listing.landlordId);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group border border-gray-100">
      <div className="relative">
        <div className="w-full h-56 bg-gray-200">
            <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover"
            />
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(listing.id);
          }}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-purple-600 transition-colors z-10"
          aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <HeartIcon className={`w-6 h-6 ${isBookmarked ? 'text-purple-600 fill-current' : 'text-gray-500'}`} />
        </button>
        {listing.distanceFromCampus < 1 && (
            <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                NEAR CAMPUS
            </div>
        )}
      </div>
      <div className="p-5 cursor-pointer" onClick={() => navigateTo('listing-detail', listing)}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-purple-700 transition-colors">{listing.title}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                    <LocationPinIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                    <span>{listing.location}</span>
                </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                <span className="text-2xl font-extrabold text-gray-900">${listing.price}</span>
                <span className="text-sm text-gray-500">/mo</span>
            </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            {landlord && (
                <div className="flex items-center space-x-2">
                    <img src={landlord.profilePicture} alt={landlord.name} className="w-8 h-8 rounded-full"/>
                    <div className="text-sm">
                        <p className="font-semibold text-gray-700">{landlord.name}</p>
                        {landlord.verificationStatus === 'verified' && (
                            <div className="flex items-center text-purple-600">
                                <ShieldCheckIcon className="w-4 h-4 mr-1" />
                                <span className="text-xs font-medium">Verified</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="flex items-center text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full capitalize">
              <BedIcon className="w-4 h-4 mr-1.5 text-purple-500" />
              <span>{listing.roomType}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
