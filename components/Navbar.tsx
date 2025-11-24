import React, { useState, useEffect } from 'react';
import { Search, Command, Bell, Menu, X, Github } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  toggleSidebar: () => void;
  currentQuery?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, toggleSidebar, currentQuery = '' }) => {
  const [inputValue, setInputValue] = useState(currentQuery);

  // Sync local state with parent state (e.g. when filters are cleared externally)
  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container flex h-16 items-center px-4 max-w-screen-2xl mx-auto">
        <button 
          onClick={toggleSidebar}
          className="mr-4 md:hidden p-2 text-slate-400 hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="mr-8 hidden md:flex">
          <a className="flex items-center gap-2" href="#">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/20">
               <Command className="h-5 w-5" />
            </div>
            <span className="hidden font-bold sm:inline-block text-white text-lg tracking-tight">
              Tutoriais LN
            </span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between gap-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="search"
                placeholder="Search content... (Press Enter)"
                className="h-10 w-full rounded-full border border-slate-800 bg-slate-900/50 pl-10 pr-10 text-sm text-slate-200 shadow-sm placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-64 lg:w-96 transition-all [&::-webkit-search-cancel-button]:hidden"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 focus:outline-none p-1 rounded-full hover:bg-slate-800 transition-colors"
                  aria-label="Clear search"
                >
                   <X className="h-3 w-3" />
                </button>
              )}
            </form>
          </div>
          <div className="flex items-center gap-2 pl-2">
             <a 
               href="https://github.com/evandroomiix/sitetutoriaisln" 
               target="_blank" 
               rel="noopener noreferrer"
               className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
               title="View on GitHub"
             >
                <Github className="h-5 w-5" />
             </a>
             <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-950 animate-pulse"></span>
             </button>
             <div className="ml-2 hidden sm:block">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-2 border-slate-800 shadow-md cursor-pointer hover:shadow-purple-500/20 transition-shadow"></div>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;