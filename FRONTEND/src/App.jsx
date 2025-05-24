import { Navigate, Outlet, redirect, useNavigate } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { performLogout } from './helper';

export default function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = async () => {
   await performLogout();
    navigate({to:'/login'})
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white shadow">
        <h1 className="text-xl font-semibold">🔗 URLShortner</h1>
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <span className="text-sm">👋 Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded shadow"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">

        {/* Route-specific content renders here */}
        <Outlet />
      </main>

      {/* Footer (optional) */}
      <footer className="text-center text-sm text-gray-500 p-4 border-t">
        &copy; {new Date().getFullYear()} URLShortner. All rights reserved.
      </footer>
    </div>
  );
}
