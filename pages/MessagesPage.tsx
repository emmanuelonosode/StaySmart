import React, { useContext, useState, useMemo, useEffect, useRef } from 'react';
import { AppContext, AppContextType } from '../App';
import { User } from '../types';
import { ShieldCheckIcon } from '../components/icons';

interface MessagesPageProps {
  recipientId?: number;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ recipientId }) => {
  const { currentUser, messages, sendMessage, users, navigateTo } = useContext(AppContext) as AppContextType;
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recipientId) {
      setActiveConversationId(recipientId);
    }
  }, [recipientId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, activeConversationId]);

  const conversations = useMemo(() => {
    if (!currentUser) return [];
    const conversationPartners = new Map<number, { user: User; lastMessage: any }>();

    messages.forEach(msg => {
      const partnerId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
      if (partnerId !== currentUser.id) {
        const existing = conversationPartners.get(partnerId);
        if (!existing || new Date(msg.timestamp) > new Date(existing.lastMessage.timestamp)) {
          const partnerUser = users.find(u => u.id === partnerId);
          if (partnerUser) {
            conversationPartners.set(partnerId, { user: partnerUser, lastMessage: msg });
          }
        }
      }
    });

    return Array.from(conversationPartners.values()).sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());
  }, [messages, currentUser, users]);

  const activeMessages = useMemo(() => {
    if (!currentUser || !activeConversationId) return [];
    return messages
      .filter(msg =>
        (msg.senderId === currentUser.id && msg.receiverId === activeConversationId) ||
        (msg.senderId === activeConversationId && msg.receiverId === currentUser.id)
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [messages, currentUser, activeConversationId]);
  
  const activePartner = users.find(u => u.id === activeConversationId);
  
  useEffect(() => {
    if(!activeConversationId && conversations.length > 0){
        setActiveConversationId(conversations[0].user.id)
    }
  }, [conversations, activeConversationId]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && activeConversationId) {
      sendMessage(newMessage, activeConversationId);
      setNewMessage('');
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Please log in to see your messages.</h2>
        <button onClick={() => navigateTo('auth')} className="mt-4 text-purple-600 hover:underline">Sign In</button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      {/* Sidebar - Conversation List */}
      <aside className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col ${activeConversationId && 'hidden md:flex'}`}>
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Messages</h1>
        </div>
        <div className="overflow-y-auto flex-grow">
          {conversations.map(({ user, lastMessage }) => (
            <button
              key={user.id}
              onClick={() => setActiveConversationId(user.id)}
              className={`w-full text-left p-4 flex items-center space-x-3 hover:bg-gray-50 ${activeConversationId === user.id ? 'bg-purple-50' : ''}`}
            >
              <img src={user.profilePicture} alt={user.name} className="w-12 h-12 rounded-full" />
              <div className="flex-grow overflow-hidden">
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">{user.name}</p>
                  {user.verificationStatus === 'verified' && <ShieldCheckIcon className="w-4 h-4 text-purple-600 flex-shrink-0"/>}
                </div>
                <p className="text-sm text-gray-500 truncate">{lastMessage.content}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Window */}
      <main className={`flex-grow flex flex-col ${!activeConversationId && 'hidden md:flex'}`}>
        {activeConversationId && activePartner ? (
          <>
            <div className="p-4 border-b flex items-center space-x-4">
              <button className="md:hidden" onClick={() => setActiveConversationId(null)}>
                  &larr;
              </button>
              <button onClick={() => navigateTo('profile', { userId: activePartner.id })} className="flex items-center space-x-3 text-left hover:bg-gray-100 p-1 rounded-md">
                <img src={activePartner.profilePicture} alt={activePartner.name} className="w-10 h-10 rounded-full" />
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold">{activePartner.name}</h2>
                    {activePartner.verificationStatus === 'verified' && <ShieldCheckIcon className="w-5 h-5 text-purple-600"/>}
                </div>
              </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                {activeMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.senderId === currentUser.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                           <p>{msg.content}</p>
                        </div>
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-purple-500 focus:border-purple-500"
                />
                <button type="submit" className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h2 className="text-xl text-gray-700">Select a conversation</h2>
              <p className="text-gray-500">Your messages will appear here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MessagesPage;