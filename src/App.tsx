import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchPanel from './components/SearchPanel';
import HotelCard from './components/HotelCard';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import { fetchRecommendations } from './services/api';
import type { Hotel, SearchParams } from './types/hotel';
import { Sparkles, Hotel as HotelIcon } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastParams, setLastParams] = useState<SearchParams | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (params: SearchParams) => {
    setLastParams(params);
    setStatus('loading');
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
      const data = await fetchRecommendations(params);

        console.log("DATA =", data);
        console.log("TYPE =", typeof data);
        console.log("IS ARRAY =", Array.isArray(data));
        if (!Array.isArray(data)) {
         console.error("NOT AN ARRAY:", data);
         return;
        }
      setHotels(data);
      setStatus(data.length > 0 ? 'success' : 'success');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Connection failed. Please ensure Flask is running.';
      setErrorMsg(msg);
      setStatus('error');
    }
  };

  const handleRetry = () => {
    if (lastParams) handleSearch(lastParams);
  };

  const scrollToSearch = () => {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-navy-950 text-white font-sans">
        <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />

        {/* Hero */}
        <HeroSection onExplore={scrollToSearch} />

        {/* Search Panel */}
        <section className="relative py-8 bg-gradient-to-b from-navy-950/0 via-navy-950 to-navy-950">
          <SearchPanel onSearch={handleSearch} loading={status === 'loading'} />
        </section>

        {/* Results */}
        <section ref={resultsRef} className="min-h-[200px] pb-24 scroll-mt-24">
          <AnimatePresence mode="wait">
            {status === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LoadingState />
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ErrorState message={errorMsg} onRetry={handleRetry} />
              </motion.div>
            )}

            {status === 'success' && hotels.length === 0 && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState />
              </motion.div>
            )}

            {status === 'success' && hotels.length > 0 && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 mt-12"
              >
                {/* Results header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between mb-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center">
                      <HotelIcon size={16} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-display font-bold text-2xl">
                        {hotels.length} Hotels Found
                      </h2>
                      <p className="text-white/40 text-xs mt-0.5">Sorted by AI match score</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-navy-800/60 border border-white/10 px-4 py-2 rounded-xl">
                    <Sparkles size={13} className="text-gold-400" />
                    <span className="text-white/60 text-xs">AI Powered</span>
                  </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {hotels.map((hotel, i) => (
                    <HotelCard key={`${hotel.HOTEL}-${i}`} hotel={hotel} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/8 bg-navy-900/40 backdrop-blur-sm py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-gold-400" />
              <span className="text-white font-display font-bold">StaySmart AI</span>
            </div>
            <p className="text-white/30 text-xs text-center">
              Discover Hotels Tailored To Your Preferences — Powered by Machine Learning
            </p>
            <p className="text-white/20 text-xs">© 2024 StaySmart AI</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
