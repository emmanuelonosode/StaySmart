import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../App';
import { LogoIcon, HomeIcon, BookmarkIcon, ChatBubbleIcon } from './icons';

interface StudentSidebarProps {
  onLogout: () => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ onLogout }) => {
  const { currentUser, navigateTo, currentPage } = useContext(AppContext) as AppContextType;

  const navItems = [
    { page: 'student-dashboard', label: 'Dashboard', icon: HomeIcon },
    { page: 'bookmarks', label: 'Bookmarks', icon: BookmarkIcon },
    { page: 'messages', label: 'Messages', icon: ChatBubbleIcon },
  ];

  if (!currentUser) return null;

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      <div className="flex items-center space-x-2 p-6 border-b border-gray-200">
        <LogoIcon className="h-8 w-8 text-purple-600" />
        <span className="text-2xl font-bold text-gray-900">StaySmart</span>
      </div>

      <nav className="flex-grow px-4 py-6">
        <ul className="space-y-2">
          {navItems.map(item => {
            const isActive = currentPage === item.page;
            return (
              <li key={item.page}>
                <button
                  onClick={() => navigateTo(item.page as any)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img src={currentUser.profilePicture} alt="Profile" className="w-10 h-10 rounded-full" />
          <div className="flex-1 overflow-hidden">
            <p className="font-semibold text-sm truncate">{currentUser.name}</p>
            <button 
                onClick={() => navigateTo('profile')} 
                className="text-xs text-gray-500 hover:underline"
            >
                View Profile
            </button>
          </div>
          <button onClick={onLogout} title="Logout" className="text-gray-400 hover:text-purple-600 p-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar;
