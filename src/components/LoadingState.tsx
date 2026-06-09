import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Loading header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 bg-navy-800/60 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-2xl">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-royal-500"
              />
            ))}
          </div>
          <span className="text-white/70 text-sm">Analyzing your travel preferences...</span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 max-w-xs mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-royal-500 to-transparent rounded-full"
          />
        </div>
      </motion.div>

      {/* Skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-navy-800/60 border border-white/8 rounded-2xl overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="h-52 bg-navy-700/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </div>
            {/* Content skeleton */}
            <div className="p-5 space-y-3">
              <div className="h-5 w-4/5 bg-navy-700/60 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              </div>
              <div className="h-3 w-3/5 bg-navy-700/40 rounded-lg" />
              <div className="flex justify-between items-end pt-2">
                <div className="h-6 w-24 bg-navy-700/50 rounded-lg" />
                <div className="h-4 w-12 bg-navy-700/30 rounded-lg" />
              </div>
              <div className="flex gap-2 pt-1">
                <div className="flex-1 h-9 bg-navy-700/50 rounded-xl" />
                <div className="w-20 h-9 bg-navy-700/30 rounded-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
