import React, { useContext, useState, useMemo } from 'react';
import { AppContext, AppContextType } from '../App';
import { ShieldCheckIcon, StarIcon, EditIcon, CameraIcon } from '../components/icons';
import { User } from '../types';

interface ProfilePageProps {
  userId?: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const { currentUser, users, updateUser, navigateTo, reviews, addReview } = useContext(AppContext) as AppContextType;

  const [isEditing, setIsEditing] = useState(false);
  const [draftProfile, setDraftProfile] = useState<Pick<User, 'name' | 'profilePicture'> | null>(null);
  
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');

  const profileUser = useMemo(() => {
    return userId ? users.find(u => u.id === userId) : currentUser;
  }, [userId, users, currentUser]);
  
  const isOwnProfile = profileUser?.id === currentUser?.id;

  const landlordReviews = useMemo(() => {
    if (profileUser?.role !== 'landlord') return [];
    return reviews
      .filter(r => r.landlordId === profileUser.id)
      .sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [reviews, profileUser]);

  const handleEditClick = () => {
    if (profileUser) {
        setDraftProfile({
            name: profileUser.name,
            profilePicture: profileUser.profilePicture,
        });
        setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDraftProfile(null);
  };

  const handleSaveProfile = () => {
    if (profileUser && draftProfile) {
        updateUser({ ...profileUser, ...draftProfile });
        handleCancelEdit();
    }
  };

  const handlePictureChange = () => {
      if (draftProfile) {
          const newSeed = draftProfile.name || 'new-user';
          const newProfilePicture = `https://picsum.photos/seed/${newSeed}/${Date.now()}/128/128`;
          // FIX: Corrected variable name from `profilePicture` to `newProfilePicture`.
          setDraftProfile({ ...draftProfile, profilePicture: newProfilePicture });
      }
  };
  
  const handleStudentVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
        updateUser({ ...currentUser, verificationStatus: 'verified' });
    }
  };

  const handleLandlordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
        updateUser({ ...currentUser, verificationStatus: 'pending' });
    }
  };
  
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewRating > 0 && newReviewComment.trim() && profileUser) {
        addReview({
            landlordId: profileUser.id,
            rating: newReviewRating,
            comment: newReviewComment,
        });
        setNewReviewRating(0);
        setNewReviewComment('');
    }
  }

  if (!currentUser) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Please log in to view profiles.</h2>
        <button onClick={() => navigateTo('auth')} className="mt-4 text-purple-600 hover:underline">
          Sign In
        </button>
      </div>
    );
  }
  
  if (!profileUser) {
     return <div className="text-center py-20"><h2 className="text-2xl font-bold">User not found.</h2></div>;
  }
  
  const VerificationStatusBadge = () => {
      let bgColor, textColor, text;
      switch (profileUser.verificationStatus) {
          case 'verified': bgColor = 'bg-green-100'; textColor = 'text-green-800'; text = 'Verified'; break;
          case 'pending': bgColor = 'bg-yellow-100'; textColor = 'text-yellow-800'; text = 'Pending Review'; break;
          default: bgColor = 'bg-red-100'; textColor = 'text-red-800'; text = 'Unverified'; break;
      }
      return <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>{text}</span>
  };

  const StarRating = ({ rating, setRating, interactive = false }: { rating: number, setRating?: (r: number) => void, interactive?: boolean }) => (
    <div className="flex space-x-1">
        {[1,2,3,4,5].map(star => (
            <button 
                key={star} 
                disabled={!interactive} 
                onClick={() => setRating && setRating(star)} 
                className={`text-yellow-400 ${interactive ? 'cursor-pointer' : ''}`}
            >
                <StarIcon className="w-5 h-5" filled={star <= rating} />
            </button>
        ))}
    </div>
  );

  const VerificationContent = () => {
    if (!isOwnProfile) return null;
    switch(profileUser.verificationStatus) {
      case 'verified': return <div className="mt-6 p-4 bg-green-50 rounded-md"><p className="text-sm font-medium text-green-800">You are verified!</p></div>
      case 'pending': return <div className="mt-6 p-4 bg-yellow-50 rounded-md"><p className="text-sm font-medium text-yellow-800">Your documents are under review.</p></div>
      default: return profileUser.role === 'student' ? (
         <form onSubmit={handleStudentVerify} className="mt-4 sm:flex sm:items-center"><div className="w-full sm:max-w-xs"><input type="email" name="email" className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@university.edu" required /></div><button type="submit" className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Verify</button></form>
      ) : (
         <form onSubmit={handleLandlordSubmit} className="mt-4 space-y-4"><p className="mt-1 text-sm text-gray-600">Upload proof of identity and property ownership.</p><div><input type="file" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"/></div><div><input type="file" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"/></div><button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 sm:text-sm">Submit for Review</button></form>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className={`px-4 py-5 sm:px-6 transition-colors duration-300 ${isEditing ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img className="h-24 w-24 rounded-full" src={isEditing ? draftProfile?.profilePicture : profileUser.profilePicture} alt={`${profileUser.name}'s profile`} />
                {isEditing && (
                    <button 
                        onClick={handlePictureChange}
                        className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-200 transition-colors"
                        title="Change picture"
                    >
                        <CameraIcon className="w-5 h-5 text-gray-600" />
                    </button>
                )}
              </div>
              <div className="pt-2">
                {isEditing && draftProfile ? (
                    <input type="text" value={draftProfile.name} onChange={e => setDraftProfile({...draftProfile, name: e.target.value})} className="text-2xl font-bold text-gray-900 p-1 -ml-1 rounded-md border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-500 outline-none bg-white" />
                ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
                )}
                <p className="text-sm font-medium text-gray-500">{profileUser.email}</p>
                <div className="mt-2"><VerificationStatusBadge/></div>
              </div>
            </div>
            {isOwnProfile && !isEditing && (
                <button onClick={handleEditClick} className="flex items-center space-x-2 px-3 py-1.5 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors">
                    <EditIcon className="w-4 h-4 text-gray-400"/><span>Edit Profile</span>
                </button>
            )}
          </div>
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-3">
                 <button onClick={handleCancelEdit} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                 <button onClick={handleSaveProfile} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">Save Changes</button>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{profileUser.role}</dd>
            </div>
            {isOwnProfile && <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Verification</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><VerificationContent /></dd>
            </div>}
          </dl>
        </div>
      </div>
      
      {profileUser.role === 'landlord' && (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
            {currentUser.role === 'student' && !isOwnProfile && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-medium mb-2">Leave a Review</h3>
                    <form onSubmit={handleAddReview} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                            <StarRating rating={newReviewRating} setRating={setNewReviewRating} interactive={true} />
                        </div>
                        <div>
                           <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                           <textarea id="comment" value={newReviewComment} onChange={e => setNewReviewComment(e.target.value)} rows={3} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"></textarea>
                        </div>
                        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 sm:text-sm">Submit Review</button>
                    </form>
                </div>
            )}
            <div className="space-y-4">
                {landlordReviews.length > 0 ? landlordReviews.map(review => {
                    const student = users.find(u => u.id === review.studentId);
                    return (<div key={review.id} className="bg-white shadow rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                            <img src={student?.profilePicture} alt={student?.name} className="h-10 w-10 rounded-full" />
                            <div>
                                <div className="flex items-center space-x-2">
                                    <p className="font-semibold">{student?.name}</p>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
                                <p className="text-xs text-gray-500 mt-2">{new Date(review.timestamp).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>)
                }) : <p className="text-gray-500">No reviews yet.</p>}
            </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;