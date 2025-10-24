import React, { useContext, useState } from 'react';
import { AppContext, AppContextType } from '../App';
import { LogoIcon, UserCircleIcon, MenuIcon } from './icons';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { currentUser, navigateTo } = useContext(AppContext) as AppContextType;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const renderUserMenu = () => {
    if (!currentUser) {
      return (
        <button
          onClick={() => navigateTo('auth')}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Sign In
        </button>
      );
    }

    return (
      <div className="relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
          <img src={currentUser.profilePicture} alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="hidden md:block text-sm font-medium">{currentUser.name}</span>
        </button>
        {isDropdownOpen && (
           <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
             <button
               onClick={() => { navigateTo('profile'); setIsDropdownOpen(false); }}
               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
             >
               My Profile
             </button>
             <button
               onClick={() => { onLogout(); setIsDropdownOpen(false); }}
               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
             >
               Logout
             </button>
           </div>
        )}
      </div>
    );
  };

  const navLinks = currentUser?.role === 'landlord' ? (
    <>
        <button onClick={() => navigateTo('landlord-dashboard')} className="text-gray-700 hover:text-purple-600">My Listings</button>
        <button onClick={() => navigateTo('post-listing')} className="text-gray-700 hover:text-purple-600">Post a Room</button>
        <button onClick={() => navigateTo('messages')} className="text-gray-700 hover:text-purple-600">Messages</button>
    </>
  ) : (
    <>
        <button onClick={() => navigateTo('student-dashboard')} className="text-gray-700 hover:text-purple-600">Browse</button>
        <button onClick={() => navigateTo('bookmarks')} className="text-gray-700 hover:text-purple-600">Bookmarks</button>
        <button onClick={() => navigateTo('messages')} className="text-gray-700 hover:text-purple-600">Messages</button>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigateTo(currentUser ? (currentUser.role === 'student' ? 'student-dashboard' : 'landlord-dashboard') : 'landing')} className="flex items-center space-x-2">
              <LogoIcon className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">StaySmart</span>
            </button>
            <nav className="hidden md:flex items-center space-x-6 pl-6">
              {currentUser && navLinks}
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {renderUserMenu()}
          </div>
          <div className="md:hidden">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuIcon className="w-6 h-6"/></button>
          </div>
        </div>
      </div>
       {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col items-center space-y-4">
            {currentUser && navLinks}
            <div className="flex flex-col items-center space-y-4 pt-4 border-t w-full">
              {currentUser && (
                <>
                  <button onClick={() => {navigateTo('profile'); setIsMenuOpen(false);}} className="text-gray-700 hover:text-purple-600">My Profile</button>
                  <button onClick={() => {onLogout(); setIsMenuOpen(false);}} className="text-sm text-gray-600 hover:text-purple-600">Logout</button>
                </>
              )}
              {!currentUser && <button
                  onClick={() => { navigateTo('auth'); setIsMenuOpen(false); }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Sign In
                </button>}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;