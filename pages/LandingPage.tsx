
import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../App';
import { VideoCameraIcon, CheckCircleIcon } from '../components/icons';

const LandingPage: React.FC = () => {
  const { navigateTo } = useContext(AppContext) as AppContextType;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Find Your Perfect Off-Campus Stay</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">Sleek, simple, and student-focused. StaySmart is the modern way to discover and book off-campus housing you'll love.</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button onClick={() => navigateTo('auth')} className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Get started</button>
                <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything students and landlords need</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">From virtual tours to verified listings, we've built a platform based on trust and convenience.</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <VideoCameraIcon className="h-6 w-6 text-white" />
                  </div>
                  Video Inspections
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Tour your next home from anywhere. Landlords can easily upload video walkthroughs for a true-to-life preview.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  Verified Listings
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Feel secure with verified landlords and student profiles. We prioritize safety and trust in our community.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
