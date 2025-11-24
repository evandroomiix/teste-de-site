import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TutorialCard from './components/TutorialCard';
import TutorialView from './components/TutorialView';
import { TUTORIALS } from './constants';
import { ContentType } from './types';

// Wrapper component to handle logic inside Router context
const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<ContentType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Filter Tutorials
  const filteredTutorials = TUTORIALS.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.tags.includes(selectedCategory);
    const matchesType = selectedType === 'ALL' || t.type === selectedType;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
                          t.title.toLowerCase().includes(searchLower) || 
                          t.excerpt.toLowerCase().includes(searchLower) ||
                          t.tags.some(tag => tag.toLowerCase().includes(searchLower));
    return matchesCategory && matchesType && matchesSearch;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleTypeSelect = (type: ContentType | 'ALL') => {
    setSelectedType(type);
    // If browsing types, maybe clear category or keep it as AND filter? 
    // Keeping it as AND filter allows "Dev Videos" vs "Design Videos"
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleTutorialClick = (id: string) => {
    navigate(`/tutorial/${id}`);
  };

  // Mobile sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-blue-500/30 flex flex-col">
      <Navbar 
        onSearch={handleSearch} 
        toggleSidebar={toggleSidebar} 
        currentQuery={searchQuery}
      />
      
      <div className="flex flex-1">
        <Sidebar 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategorySelect}
          selectedType={selectedType}
          onSelectType={handleTypeSelect}
          isOpen={isSidebarOpen}
        />
        
        <main className="flex-1 flex flex-col px-4 py-8 md:px-8 max-w-full overflow-x-hidden">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <div className="animate-in fade-in duration-500 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/50">
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                          {selectedCategory === 'all' ? 'All Content' : `Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                        </h1>
                        <p className="text-slate-400 text-sm flex items-center gap-2">
                          {searchQuery 
                            ? `Showing results for "${searchQuery}"` 
                            : 'Explore our latest tutorials and resources'}
                          {selectedType !== 'ALL' && (
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs font-mono text-blue-400 border border-slate-700">
                              Type: {selectedType}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400">
                        {filteredTutorials.length} {filteredTutorials.length === 1 ? 'Result' : 'Results'}
                      </div>
                  </div>

                  {filteredTutorials.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {filteredTutorials.map(tutorial => (
                        <TutorialCard 
                          key={tutorial.id} 
                          tutorial={tutorial} 
                          onClick={handleTutorialClick} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                      <div className="h-16 w-16 mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                          <svg className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
                      <p className="text-slate-500 text-center max-w-md mb-6">
                        We couldn't find any content matching your criteria. Try clearing filters.
                      </p>
                      <button 
                          onClick={() => { 
                            setSearchQuery(''); 
                            setSelectedCategory('all'); 
                            setSelectedType('ALL');
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20"
                      >
                          Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              } />
              
              <Route path="/tutorial/:id" element={<TutorialDetailWrapper />} />
            </Routes>
          </div>

          {/* Footer */}
          <footer className="mt-12 border-t border-slate-800/50 pt-6 pb-2">
             <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                <p>&copy; 2024 Tutoriais LN. All rights reserved.</p>
                <div className="flex items-center gap-4">
                   <a href="https://github.com/evandroomiix/sitetutoriaisln" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      GitHub Repository
                   </a>
                   <span className="h-1 w-1 rounded-full bg-slate-700"></span>
                   <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                </div>
             </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

// Helper to extract ID and find tutorial
const TutorialDetailWrapper: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const id = pathname.split('/').pop();
  const tutorial = TUTORIALS.find(t => t.id === id);

  if (!tutorial) {
    return (
        <div className="flex h-[70vh] flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white mb-2">404</h2>
            <p className="text-slate-400 mb-6">Tutorial not found</p>
            <button 
              onClick={() => navigate('/')} 
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Return Home
            </button>
        </div>
    );
  }

  return <TutorialView tutorial={tutorial} onBack={() => navigate('/')} />;
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;