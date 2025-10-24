
import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '../App';
import { Listing } from '../types';

interface PostListingPageProps {
  existingListing?: Listing;
}

const PostListingPage: React.FC<PostListingPageProps> = ({ existingListing }) => {
  const { listings, updateListings, currentUser, navigateTo } = useContext(AppContext) as AppContextType;
  const [title, setTitle] = useState(existingListing?.title || '');
  const [price, setPrice] = useState(existingListing?.price || 0);
  const [location, setLocation] = useState(existingListing?.location || '');
  const [description, setDescription] = useState(existingListing?.description || '');
  const [roomType, setRoomType] = useState<'shared' | 'single' | 'self-contained'>(existingListing?.roomType || 'single');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== 'landlord') return;

    if (existingListing) {
      // Edit logic
      const updatedListings = listings.map(l =>
        l.id === existingListing.id ? { ...l, title, price, location, description, roomType } : l
      );
      updateListings(updatedListings);
    } else {
      // Create new logic
      const newListing: Listing = {
        id: Date.now(), // simple unique id for demo
        title,
        price,
        location,
        description,
        roomType,
        amenities: ['WiFi', 'Kitchen'],
        isShared: roomType === 'shared',
        images: ['https://picsum.photos/seed/' + Date.now() + '/800/600'],
        landlordId: currentUser.id,
        rules: ['No smoking'],
        distanceFromCampus: 1.0,
      };
      updateListings([...listings, newListing]);
    }

    navigateTo('landlord-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{existingListing ? 'Edit Your Listing' : 'Post a New Listing'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Listing Title</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" placeholder="e.g., Cozy Room Near Campus"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Rent per Month ($)</label>
            <input type="number" id="price" value={price} onChange={e => setPrice(Number(e.target.value))} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
          </div>
          <div>
             <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Room Type</label>
            <select id="roomType" value={roomType} onChange={e => setRoomType(e.target.value as any)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm">
                <option value="single">Single Room</option>
                <option value="shared">Shared Room</option>
                <option value="self-contained">Self-Contained Unit</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location / Address</label>
          <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        <div>
           <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
           <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" placeholder="Describe the room, amenities, and nearby attractions."></textarea>
        </div>
        
        <div>
            <h3 className="text-lg font-medium text-gray-900">Upload Media</h3>
            <div className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                            <span>Upload images and videos</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB; MP4 up to 50MB</p>
                </div>
            </div>
        </div>

        <div className="flex justify-end pt-4">
            <button type="button" onClick={() => navigateTo('landlord-dashboard')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
             {existingListing ? 'Save Changes' : 'Publish Listing'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default PostListingPage;
