import React, { useState } from 'react';
import { Role } from '../types';
import { LogoIcon, GoogleIcon } from '../components/icons';

interface AuthPageProps {
  onLogin: (email: string, role: Role) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // In a real app, you'd have more robust validation and an API call
    onLogin(email, isLogin ? 'student' : role);
  };
  
  const handleSocialLogin = () => {
    // For demo, log in as a predefined student user
    onLogin('alex@university.edu', 'student');
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
           <button onClick={() => window.location.reload()} className="flex items-center space-x-2 mb-8 text-gray-600 hover:text-gray-900">
             <LogoIcon className="h-8 w-auto text-purple-600" />
             <span className="text-2xl font-bold">StaySmart</span>
           </button>
           
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-purple-600 hover:text-purple-500">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <div className="mt-8">
            <button
                type="button"
                onClick={handleSocialLogin}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                <GoogleIcon className="w-5 h-5 mr-2" />
                Continue with Google
            </button>
            <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 text-gray-500">Or with email</span>
                </div>
            </div>
          </div>
          
          <div className="mt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-gray-700">I'm a...</label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`w-full inline-flex items-center justify-center py-3 px-4 border rounded-lg text-sm font-medium transition-colors ${role === 'student' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'}`}
                    >
                      <span className="mr-2">🎓</span> Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('landlord')}
                      className={`w-full inline-flex items-center justify-center py-3 px-4 border rounded-lg text-sm font-medium transition-colors ${role === 'landlord' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'}`}
                    >
                      <span className="mr-2">🏠</span> Landlord
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {error && <p className="text-sm text-red-600">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg border border-transparent bg-purple-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {isLogin ? 'Sign in' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://picsum.photos/seed/auth-page/1000/1200"
          alt="Modern student apartment"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
         <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-md rounded-xl">
            <p className="text-2xl font-medium text-white">
                "Finding a great place near campus was so stressful until I found StaySmart. It's genuinely built for students."
            </p>
            <p className="mt-4 font-semibold text-purple-200">- Maria K., Law Student</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
