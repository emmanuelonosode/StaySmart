import React, { useContext } from 'react';
import { Listing } from '../types';
import { AppContext, AppContextType } from '../App';
import { LocationPinIcon, MoneyIcon, BedIcon, CheckCircleIcon, ShareIcon, HeartIcon, ShieldCheckIcon } from '../components/icons';

interface ListingDetailPageProps {
  listing: Listing;
}

const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ listing }) => {
  const { navigateTo, currentUser, bookmarks, toggleBookmark, users } = useContext(AppContext) as AppContextType;
  const landlord = users.find(u => u.id === listing.landlordId);
  const [mainImage, setMainImage] = React.useState(listing.images[0]);
  const isBookmarked = currentUser ? bookmarks[currentUser.id]?.has(listing.id) ?? false : false;

  if (!listing) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Listing not found</h2>
        <button onClick={() => navigateTo('student-dashboard')} className="mt-4 text-purple-600 hover:underline">
          Back to listings
        </button>
      </div>
    );
  }

  const handleMessageLandlord = () => {
    if (!currentUser) {
      navigateTo('auth');
      return;
    }
    navigateTo('messages', { recipientId: listing.landlordId });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{listing.title}</h1>
                    <div className="mt-2 flex items-center text-gray-600">
                        <LocationPinIcon className="w-5 h-5 mr-2" />
                        <span>{listing.location}</span>
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-2 flex-shrink-0">
                    <button
                        onClick={() => toggleBookmark(listing.id)}
                        className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                    >
                        <HeartIcon className={`w-5 h-5 ${isBookmarked ? 'text-purple-600 fill-current' : 'text-gray-500'}`} />
                        <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                        <ShareIcon className="w-5 h-5 text-gray-500"/>
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>


        {/* Image Gallery & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden shadow-lg">
              <img src={mainImage} alt={listing.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {listing.images.map((img, index) => (
                <button key={index} onClick={() => setMainImage(img)} className={`rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-purple-600' : 'border-transparent'}`}>
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-24 object-cover"/>
                </button>
              ))}
            </div>
          </div>
          
          {/* Details & Actions Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center">
                 <p className="text-3xl font-bold text-gray-900">${listing.price}<span className="text-base font-normal text-gray-500">/month</span></p>
                 <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full capitalize">{listing.roomType}</span>
              </div>
              <p className="mt-4 text-gray-700">{listing.description}</p>
              
              <div className="mt-6 space-y-4">
                  <button onClick={handleMessageLandlord} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Message Landlord
                  </button>
                  <button className="w-full border border-purple-600 text-purple-600 font-bold py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors">
                    Schedule Video Inspection
                  </button>
              </div>
              
               {landlord && (
                <button onClick={() => navigateTo('profile', { userId: landlord.id })} className="mt-8 pt-6 border-t border-gray-200 flex items-center w-full text-left hover:bg-gray-100 p-2 rounded-lg transition-colors">
                  <img src={landlord.profilePicture} alt={landlord.name} className="w-12 h-12 rounded-full"/>
                  <div className="ml-4">
                    <div className="flex items-center space-x-1.5">
                       <p className="font-semibold text-gray-900">{landlord.name}</p>
                       {landlord.verificationStatus === 'verified' && <ShieldCheckIcon className="w-5 h-5 text-purple-600" title="Verified Landlord"/>}
                    </div>
                    <p className="text-sm text-gray-500">Landlord</p>
                  </div>
                </button>
               )}
            </div>
          </div>
        </div>
        
        {/* Further Details Section */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Room Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <ul className="space-y-2">
                    {listing.amenities.map(amenity => (
                        <li key={amenity} className="flex items-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2"/>
                            <span className="text-gray-700">{amenity}</span>
                        </li>
                    ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">House Rules</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {listing.rules.map(rule => <li key={rule}>{rule}</li>)}
                </ul>
              </div>
          </div>
        </div>

        {listing.videoUrl && (
             <div className="mt-12 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-4">Video Walkthrough</h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                        src={listing.videoUrl} 
                        title="Video Walkthrough" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetailPage;