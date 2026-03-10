import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0D1117]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
