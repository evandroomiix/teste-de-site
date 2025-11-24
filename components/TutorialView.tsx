import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tutorial, ContentType } from '../types';
import { ArrowLeft, Calendar, User, Sparkles, Play, Download, ExternalLink, Bot } from 'lucide-react';
import AskAI from './AskAI';
import { generateContentSummary } from '../services/geminiService';
import { TUTORIALS } from '../constants';
import TutorialCard from './TutorialCard';

interface TutorialViewProps {
  tutorial: Tutorial;
  onBack: () => void;
}

const TutorialView: React.FC<TutorialViewProps> = ({ tutorial, onBack }) => {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const fetchSummary = async () => {
      setLoadingSummary(true);
      const summary = await generateContentSummary(tutorial.content);
      if (isMounted) {
        setAiSummary(summary);
        setLoadingSummary(false);
      }
    };

    fetchSummary();

    return () => {
      isMounted = false;
    };
  }, [tutorial.id, tutorial.content]);

  // Logic for related tutorials (share tags, exclude current)
  const relatedTutorials = TUTORIALS.filter(t => 
    t.id !== tutorial.id && 
    t.tags.some(tag => tutorial.tags.includes(tag))
  ).slice(0, 3);

  const handleRelatedClick = (id: string) => {
    navigate(`/tutorial/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-full pb-20">
      {/* Toolbar */}
      <div className="sticky top-16 z-10 mb-6 flex items-center justify-between bg-slate-900/95 py-4 backdrop-blur border-b border-slate-800/50 px-2">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </button>
        <button
          onClick={() => setIsAIOpen(true)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 hover:from-blue-500 hover:to-indigo-500 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          Ask AI about this
        </button>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="mb-8">
           <div className="mb-4 flex flex-wrap gap-2">
            {tutorial.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-900/30 text-blue-300 border border-blue-800/50 uppercase tracking-wider">
                    {tag}
                </span>
            ))}
           </div>
           <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {tutorial.title}
           </h1>
           
           {/* AI Generated Summary Section */}
           <div className="my-6 rounded-xl bg-slate-800/40 border border-blue-500/20 p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500"></div>
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <Bot className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">AI Summary</h3>
                  {loadingSummary ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-2 bg-slate-700 rounded w-full max-w-md"></div>
                      <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {aiSummary || tutorial.excerpt}
                    </p>
                  )}
                </div>
              </div>
           </div>

           <div className="flex items-center gap-6 text-sm text-slate-400">
             <div className="flex items-center gap-2">
               <User className="h-4 w-4" />
               {tutorial.author}
             </div>
             <div className="flex items-center gap-2">
               <Calendar className="h-4 w-4" />
               {tutorial.date}
             </div>
           </div>
        </div>

        {/* Content Body */}
        <article className="prose prose-invert prose-lg max-w-none mb-16">
            
            {/* Content Type Specific Rendering */}
            {tutorial.type === ContentType.VIDEO && tutorial.videoUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl mb-8 border border-slate-800">
                    <iframe 
                        src={tutorial.videoUrl} 
                        title={tutorial.title}
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {tutorial.type === ContentType.IMAGE && (
                <div className="mb-8 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <img src={tutorial.thumbnailUrl} alt={tutorial.title} className="w-full h-auto" />
                </div>
            )}

            {/* Document/PDF Viewer */}
            {tutorial.type === ContentType.DOCUMENT && (
                <div className="mb-8 flex flex-col rounded-xl border border-slate-700 bg-slate-800 overflow-hidden">
                    <div className="flex items-center justify-between p-3 bg-slate-900 border-b border-slate-700">
                         <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                             <span className="text-xl">📄</span>
                             Document Preview
                         </div>
                         <div className="flex gap-2">
                            <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Open in new tab">
                                <ExternalLink className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Download">
                                <Download className="h-4 w-4" />
                            </button>
                         </div>
                    </div>
                    <div className="h-[500px] w-full bg-slate-700 flex items-center justify-center">
                        {tutorial.docUrl ? (
                             <iframe 
                                src={`https://docs.google.com/gview?url=${tutorial.docUrl}&embedded=true`}
                                className="w-full h-full"
                                title="Document Viewer"
                             />
                        ) : (
                            <div className="text-center p-8">
                                <p className="text-slate-400 mb-4">Document preview not available for this mock item.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Text Content */}
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed bg-slate-800/30 p-6 rounded-xl border border-slate-800/50">
                {tutorial.content}
            </div>
        </article>

        {/* Related Tutorials */}
        {relatedTutorials.length > 0 && (
          <div className="border-t border-slate-800/50 pt-10 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Related Content</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTutorials.map(related => (
                <TutorialCard 
                  key={related.id} 
                  tutorial={related} 
                  onClick={handleRelatedClick} 
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* AI Sidebar */}
      <AskAI 
        contextContent={tutorial.content}
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </div>
  );
};

export default TutorialView;