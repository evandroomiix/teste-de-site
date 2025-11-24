import React from 'react';
import { LayoutGrid, Code, PenTool, FileText, Cpu, Video, Image as ImageIcon, BookOpen } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { ContentType } from '../types';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  selectedType: ContentType | 'ALL';
  onSelectType: (type: ContentType | 'ALL') => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedCategory, 
  onSelectCategory, 
  selectedType,
  onSelectType,
  isOpen 
}) => {
  
  const getIcon = (id: string) => {
    switch (id) {
      case 'all': return <LayoutGrid className="mr-2 h-4 w-4" />;
      case 'dev': return <Code className="mr-2 h-4 w-4" />;
      case 'design': return <PenTool className="mr-2 h-4 w-4" />;
      case 'productivity': return <FileText className="mr-2 h-4 w-4" />;
      case 'ai': return <Cpu className="mr-2 h-4 w-4" />;
      default: return <BookOpen className="mr-2 h-4 w-4" />;
    }
  };

  const typeFilters = [
    { id: ContentType.VIDEO, label: 'Videos', icon: <Video className="mr-2 h-4 w-4" /> },
    { id: ContentType.IMAGE, label: 'Images', icon: <ImageIcon className="mr-2 h-4 w-4" /> },
    { id: ContentType.DOCUMENT, label: 'Documents', icon: <FileText className="mr-2 h-4 w-4" /> },
  ];

  return (
    <aside className={`
      fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-700 bg-slate-900 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:sticky md:translate-x-0 md:block
    `}>
      <div className="h-full py-6 pl-8 pr-4 overflow-y-auto">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-white">
          Library
        </h2>
        <div className="space-y-1">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onSelectCategory(category.id);
                onSelectType('ALL'); // Reset type when category changes if desired, or keep it.
              }}
              className={`
                w-full flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors
                ${selectedCategory === category.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              {getIcon(category.id)}
              {category.name}
              <span className="ml-auto text-xs opacity-60">{category.count}</span>
            </button>
          ))}
        </div>

        <h2 className="mb-2 mt-8 px-2 text-lg font-semibold tracking-tight text-white">
          Media Types
        </h2>
        <div className="space-y-1">
           {typeFilters.map((type) => (
             <button 
               key={type.id}
               onClick={() => onSelectType(selectedType === type.id ? 'ALL' : type.id)}
               className={`
                 w-full flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors
                 ${selectedType === type.id 
                   ? 'bg-slate-800 text-blue-400 border border-slate-700' 
                   : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
               `}
             >
               {type.icon}
               {type.label}
             </button>
           ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;