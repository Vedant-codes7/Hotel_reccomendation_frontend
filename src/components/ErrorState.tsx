import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 text-center max-w-md mx-auto px-4"
    >
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-xl" />
        <div className="relative bg-navy-800/80 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={24} className="text-red-400" />
          </div>

          <h3 className="text-white font-display font-bold text-xl mb-2">Something Went Wrong</h3>
          <p className="text-white/50 text-sm mb-6 leading-relaxed">
            {message || 'Unable to connect to the recommendation service. Make sure the Flask server is running on port 5000.'}
          </p>

          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-500 hover:to-royal-600 text-white text-sm font-semibold rounded-xl shadow-lg transition-all duration-200"
          >
            <RefreshCw size={14} />
            Try Again
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
