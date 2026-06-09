import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 text-center max-w-md mx-auto px-4"
    >
      <div className="relative mx-auto w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full bg-royal-600/20 blur-2xl" />
        <div className="relative w-24 h-24 rounded-full bg-navy-800/60 border border-white/10 flex items-center justify-center">
          <SearchX size={36} className="text-white/30" />
        </div>
      </div>

      <h3 className="text-white font-display font-bold text-2xl mb-3">No Hotels Found</h3>
      <p className="text-white/50 text-sm leading-relaxed">
        No hotels matched your preferences. Try adjusting your filters — a different city, higher
        budget, or fewer amenities might reveal more options.
      </p>

      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mt-8 text-white/20 text-xs"
      >
        Tip: Try reducing the minimum rating or expanding your budget range
      </motion.div>
    </motion.div>
  );
}
