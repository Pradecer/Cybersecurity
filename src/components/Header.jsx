import { useAuth } from '../contexts/AuthContext';
import { Search, LogOut, User } from 'lucide-react';

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#0a0d14] px-6">
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 bg-gray-800 py-2 pl-10 pr-3 text-gray-300 font-mono placeholder:text-gray-400 focus:bg-gray-900 focus:ring-2 focus:ring-inset focus:ring-neon-green sm:text-sm sm:leading-6"
            placeholder="Search labs, notes, or flags..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-300 hidden sm:block">
            {currentUser?.email}
          </span>
          <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-neon-green border border-neon-green">
            <User className="h-5 w-5" />
          </div>
        </div>
        <button
          onClick={logout}
          className="group flex items-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          title="Sign Out"
        >
          <LogOut className="h-5 w-5 group-hover:text-red-400 transition-colors" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
