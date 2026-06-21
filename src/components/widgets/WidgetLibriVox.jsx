import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookAudio, Play, Pause, ChevronLeft, Loader, Headphones, Volume2 } from 'lucide-react';

const LIBRIVOX_BOOKS = [
  { 
    id: '13988', 
    title: 'Dom Casmurro', 
    author: 'Machado de Assis', 
    cover: 'https://archive.org/download/dom_casmurro_2102_librivox/domcasmurro_2102.jpg', 
    rss: 'https://librivox.org/rss/13988' 
  },
  { 
    id: '12879', 
    title: 'O Cortiço', 
    author: 'Aluísio Azevedo', 
    cover: 'https://archive.org/download/LibrivoxCdCoverArt30/cortico_1711.jpg', 
    rss: 'https://librivox.org/rss/12879' 
  },
  { 
    id: '3058', 
    title: 'O Alienista', 
    author: 'Machado de Assis', 
    cover: 'https://archive.org/download/LibrivoxCdCoverArt12/alienista_1109.jpg', 
    rss: 'https://librivox.org/rss/3058' 
  }
];

export default function WidgetLibriVox() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);

  const openBook = async (book) => {
    setSelectedBook(book);
    setLoading(true);
    try {
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(book.rss)}`);
      const data = await res.json();
      if (data.status === 'ok') {
        const validChapters = data.items.filter(item => item.enclosure && item.enclosure.link);
        setChapters(validChapters.reverse()); // LibriVox feeds often put newest/last chapter first. Reverse if needed, but let's test. 
        // Wait, usually chapters are chronological but rss is reverse chronological. I'll reverse it.
      }
    } catch (err) {
      console.error("Erro ao carregar audiolivro", err);
    } finally {
      setLoading(false);
    }
  };

  const closeBook = () => {
    setSelectedBook(null);
    setChapters([]);
  };

  const playTrack = (track) => {
    if (currentTrack && currentTrack.guid === track.guid) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.play().catch(e => console.log('Autoplay prevent:', e));
      setIsPlaying(true);
    }
  }, [currentTrack]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 relative overflow-hidden mb-4"
    >
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="font-bold text-slate-200 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookAudio size={18} className="text-indigo-400" />
            Brisa Literária
          </div>
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">Aberto</span>
        </h3>

        <AnimatePresence mode="wait">
          {!selectedBook ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {LIBRIVOX_BOOKS.map((book) => (
                <button 
                  key={book.id}
                  onClick={() => openBook(book)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-xl transition-all border border-transparent hover:border-slate-700/50 group text-left"
                >
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-12 h-16 object-cover rounded-md shadow-md group-hover:scale-105 transition-transform bg-slate-800"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150x200/1e293b/a5b4fc?text=Audiobook' }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-1">{book.title}</h4>
                    <p className="text-xs text-slate-400">{book.author}</p>
                  </div>
                  <div className="ml-auto p-2 bg-indigo-500/10 rounded-full text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Headphones size={14} />
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="book"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col h-[250px]"
            >
              <button 
                onClick={closeBook}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white mb-3 w-fit"
              >
                <ChevronLeft size={14} /> Voltar
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <img src={selectedBook.cover} alt="Cover" className="w-12 h-16 object-cover rounded-md shadow-sm bg-slate-800" />
                <div>
                  <h4 className="text-sm font-bold text-slate-200 leading-tight">{selectedBook.title}</h4>
                  <p className="text-xs text-slate-400">{selectedBook.author}</p>
                </div>
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-indigo-400">
                  <Loader size={24} className="animate-spin mb-2" />
                  <span className="text-xs">Carregando Capítulos...</span>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
                  {chapters.map((chapter, idx) => {
                    const isCurrent = currentTrack?.guid === chapter.guid;
                    // regex to clean chapter title if needed, Librivox titles are usually "Chapter 01 - title"
                    const cleanTitle = chapter.title.replace(/^([0-9]+)\s*-\s*/, '');
                    return (
                      <button
                        key={chapter.guid}
                        onClick={() => playTrack(chapter)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${isCurrent ? 'bg-indigo-500/20 border border-indigo-500/30' : 'hover:bg-slate-800'}`}
                      >
                        <span className={`text-xs truncate pr-2 flex-1 ${isCurrent ? 'text-indigo-300 font-semibold' : 'text-slate-300'}`}>
                           {cleanTitle}
                        </span>
                        {isCurrent ? (
                          isPlaying ? <Volume2 size={12} className="text-indigo-400 shrink-0" /> : <Pause size={12} className="text-indigo-400 shrink-0" />
                        ) : (
                          <Play size={12} className="text-slate-500 shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Global Player */}
        {currentTrack && (
          <div className="mt-4 pt-3 border-t border-slate-700/50">
            <audio 
              ref={audioRef}
              src={currentTrack.enclosure.link}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              controls
              controlsList="nodownload"
              className="w-full h-8 outline-none [&::-webkit-media-controls-panel]:bg-slate-800 [&::-webkit-media-controls-current-time-display]:text-xs [&::-webkit-media-controls-time-remaining-display]:text-xs [&::-webkit-media-controls-play-button]:text-indigo-500"
            />
            <p className="text-[10px] text-center text-slate-400 mt-2 truncate max-w-full px-2" title={currentTrack.title}>
              Tocando: <span className="text-indigo-300 font-medium">{currentTrack.title}</span>
            </p>
          </div>
        )}

      </div>
    </motion.div>
  );
}
