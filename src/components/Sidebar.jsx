import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Flag,
  Settings,
  ShieldAlert
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Curriculum Roadmap', href: '#roadmap', icon: Map },
  { name: 'Lab Notes', href: '#notes', icon: BookOpen },
  { name: 'Flag Tracker', href: '#flags', icon: Flag },
  { name: 'Settings', href: '#settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-[#0a0d14] border-r border-gray-800">
      <div className="flex h-16 items-center px-6 border-b border-gray-800">
        <ShieldAlert className="h-8 w-8 text-neon-green mr-3" />
        <span className="text-xl font-bold font-mono tracking-tight text-white">
          Cyber<span className="text-neon-green">LMS</span>
        </span>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center rounded-md px-3 py-3 text-sm font-medium font-mono transition-colors ${
                isActive
                  ? 'bg-gray-800 text-neon-green'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-neon-green' : 'text-gray-400 group-hover:text-gray-300'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
