
import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../App';
import { MOCK_USERS } from '../data/mock';
import { EditIcon, TrashIcon } from '../components/icons';
import { Listing } from '../types';

const LandlordDashboard: React.FC = () => {
  const { listings, updateListings, currentUser, navigateTo } = useContext(AppContext) as AppContextType;

  if (!currentUser) {
    return <div>Loading...</div>;
  }
  
  const mylistings = listings.filter(l => l.landlordId === currentUser.id);

  const handleDelete = (listingId: number) => {
    if(window.confirm("Are you sure you want to delete this listing?")){
      const newListings = listings.filter(l => l.id !== listingId);
      updateListings(newListings);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
        <button
          onClick={() => navigateTo('post-listing')}
          className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
        >
          + Post New Listing
        </button>
      </div>

      {mylistings.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {mylistings.map((listing: Listing) => (
              <li key={listing.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-md font-medium text-purple-600 truncate">{listing.title}</p>
                      <div className="ml-2 flex-shrink-0 flex space-x-2">
                        <button onClick={() => navigateTo('edit-listing', listing)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <EditIcon className="h-5 w-5"/>
                        </button>
                        <button onClick={() => handleDelete(listing.id)} className="p-1 rounded-full text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          <TrashIcon className="h-5 w-5"/>
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">{listing.location}</p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>${listing.price}/mo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
         <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">You haven't posted any listings yet.</h3>
            <p className="text-gray-500 mt-2">Click the button above to post your first room and find tenants.</p>
        </div>
      )}
    </div>
  );
};

export default LandlordDashboard;
