import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../App';
import { SearchIcon, MessageIcon, KeyIcon } from '../components/icons';

const LandingPage: React.FC = () => {
  const { navigateTo } = useContext(AppContext) as AppContextType;

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Less Searching. <br/>
              <span className="text-purple-600">More Living.</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl">
              StaySmart is the easiest way for university students to find and book their perfect off-campus home. Say goodbye to endless scrolling and hello to your new place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => navigateTo('auth')} className="w-full sm:w-auto rounded-lg bg-purple-600 px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-purple-700 transition-transform hover:scale-105">
                Find My Room
              </button>
              <a href="#how-it-works" className="w-full sm:w-auto rounded-lg bg-gray-100 px-8 py-3 text-base font-semibold text-gray-700 shadow-md hover:bg-gray-200 transition">
                How It Works
              </a>
            </div>
          </div>
          <div className="md:w-1/2 lg:w-2/5 mt-10 md:mt-0">
            <img src="https://picsum.photos/seed/landing-hero/600/700" alt="Students in a modern apartment" className="rounded-2xl shadow-2xl w-full h-full object-cover"/>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-gray-50 py-20 sm:py-28">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Next Home in 3 Simple Steps</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We've streamlined the process so you can focus on your studies, not stress about housing.</p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <SearchIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Search & Discover</h3>
              <p className="mt-2 text-base text-gray-600">Use smart filters to browse verified listings near your campus. See high-res photos and video tours.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <MessageIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Connect & Chat</h3>
              <p className="mt-2 text-base text-gray-600">Message landlords directly on our secure platform to ask questions or schedule a viewing.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <KeyIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Book & Secure</h3>
              <p className="mt-2 text-base text-gray-600">Found the one? Finalize the details and secure your new home with confidence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 sm:py-28">
          <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Don't Just Take Our Word For It</h2>
              <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                      <p className="text-gray-700">"StaySmart made finding a place for my final year a breeze. The video tours saved me so much time, and I found a great apartment just 5 minutes from campus!"</p>
                      <div className="flex items-center mt-6">
                          <img src="https://picsum.photos/seed/student1/40/40" alt="Alex Johnson" className="w-12 h-12 rounded-full"/>
                          <div className="ml-4">
                              <p className="font-semibold text-gray-900">Alex Johnson</p>
                              <p className="text-sm text-gray-500">Computer Science Student</p>
                          </div>
                      </div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                      <p className="text-gray-700">"As a landlord, this is the best platform I've used. I connected with verified, responsible students quickly. The whole process was smooth and professional."</p>
                      <div className="flex items-center mt-6">
                          <img src="https://picsum.photos/seed/landlord1/40/40" alt="Barbara Doe" className="w-12 h-12 rounded-full"/>
                          <div className="ml-4">
                              <p className="font-semibold text-gray-900">Barbara Doe</p>
                              <p className="text-sm text-gray-500">Verified Landlord</p>
                          </div>
                      </div>
                  </div>
                   <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                      <p className="text-gray-700">"I was worried about finding housing from out of state, but the detailed listings and verified landlord badges gave me peace of mind. Highly recommend!"</p>
                      <div className="flex items-center mt-6">
                          <img src="https://picsum.photos/seed/student2/40/40" alt="Chloe Davis" className="w-12 h-12 rounded-full"/>
                          <div className="ml-4">
                              <p className="font-semibold text-gray-900">Chloe Davis</p>
                              <p className="text-sm text-gray-500">Medical Student</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
