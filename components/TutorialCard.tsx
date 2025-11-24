import React from 'react';
import { Tutorial, ContentType } from '../types';
import { PlayCircle, FileText, Image as ImageIcon, File } from 'lucide-react';

interface TutorialCardProps {
  tutorial: Tutorial;
  onClick: (id: string) => void;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, onClick }) => {
  
  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case ContentType.VIDEO: return <PlayCircle className="h-5 w-5 text-white" />;
      case ContentType.IMAGE: return <ImageIcon className="h-5 w-5 text-white" />;
      case ContentType.DOCUMENT: return <File className="h-5 w-5 text-white" />;
      default: return <FileText className="h-5 w-5 text-white" />;
    }
  };

  const getTypeBadgeColor = (type: ContentType) => {
    switch (type) {
      case ContentType.VIDEO: return 'bg-red-500';
      case ContentType.IMAGE: return 'bg-purple-500';
      case ContentType.DOCUMENT: return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div 
      onClick={() => onClick(tutorial.id)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-video w-full overflow-hidden bg-slate-800 relative">
        <img 
          src={tutorial.thumbnailUrl} 
          alt={tutorial.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className={`absolute top-2 right-2 rounded-full p-1.5 ${getTypeBadgeColor(tutorial.type)} bg-opacity-90 backdrop-blur-sm`}>
          {getTypeIcon(tutorial.type)}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 mb-2">
            {tutorial.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    #{tag}
                </span>
            ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {tutorial.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">
          {tutorial.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
          <span>{tutorial.author}</span>
          <span>{tutorial.date}</span>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;