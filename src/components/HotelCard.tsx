import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, ExternalLink, Eye, ImageOff } from 'lucide-react';
import type { Hotel } from '../types/hotel';

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

const LUXURY_CONFIG = {
  LUXURY: { label: 'Luxury', color: 'text-gold-400 bg-gold-500/15 border-gold-500/30' },
  'MID RANGE': { label: 'Mid Range', color: 'text-royal-400 bg-royal-600/15 border-royal-500/30' },
  BUDGET: { label: 'Budget', color: 'text-white/70 bg-white/10 border-white/20' },
};

function detectLuxury(price: number): keyof typeof LUXURY_CONFIG {
  if (price >= 10000) return 'LUXURY';
  if (price >= 4000) return 'MID RANGE';
  return 'BUDGET';
}

export default function HotelCard({ hotel, index }: HotelCardProps) {
  const [imgError, setImgError] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const luxuryKey = detectLuxury(hotel.PRICE);
  const luxuryConf = LUXURY_CONFIG[luxuryKey];

  const displayPrice = Math.round(hotel.ORIGINAL_PRICE);
  const displayRating = (hotel.RATING * 9 + 1).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group relative bg-navy-800/60 backdrop-blur-sm border border-white/8 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-navy-900">
        {!imgError && hotel['IMAGE LINK'] ? (
          <motion.img
            src={hotel['IMAGE LINK']}
            alt={hotel.HOTEL}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy-800 to-navy-900">
            <ImageOff size={32} className="text-white/20" />
            <span className="text-white/30 text-xs">No image available</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />

        {/* Luxury Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg border text-xs font-semibold ${luxuryConf.color}`}>
          {luxuryConf.label}
        </div>

        {/* Rating pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-navy-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
          <Star size={11} className="text-gold-400 fill-gold-400" />
          <span className="text-white text-xs font-bold">{displayRating}</span>
          <span className="text-white/40 text-xs">/ 10</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-display font-bold text-lg leading-tight line-clamp-1 group-hover:text-royal-400 transition-colors duration-200">
          {hotel.HOTEL}
        </h3>

        <div className="flex items-center gap-1.5 mt-1.5">
          <MapPin size={12} className="text-royal-400 flex-shrink-0" />
          <span className="text-white/60 text-xs truncate">{hotel.LOCATION}</span>
          <span className="text-white/30 text-xs mx-1">·</span>
          <span className="text-white/50 text-xs">{hotel.CITY}</span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-white/40 text-xs">per night</span>
            <div className="text-white font-bold text-xl mt-0.5">
              ₹{displayPrice.toLocaleString('en-IN')}
            </div>
          </div>

          {hotel.similarity_score !== undefined && (
            <div className="text-right">
              <span className="text-white/40 text-xs">Match</span>
              <div className="text-gold-400 font-bold text-lg mt-0.5">
                {(hotel.similarity_score * 100).toFixed(0)}%
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <motion.a
            href={hotel['WEBSITE LINK'] || '#'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-500 hover:to-royal-600 text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-royal-600/20"
          >
            <ExternalLink size={13} />
            Visit Website
          </motion.a>
          <motion.button
            onClick={() => setDetailOpen(!detailOpen)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all duration-200"
          >
            <Eye size={13} />
            Details
          </motion.button>
        </div>

        {/* Detail Expand */}
        <motion.div
          initial={false}
          animate={{ height: detailOpen ? 'auto' : 0, opacity: detailOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-white/8 mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/50">City</span>
              <span className="text-white/80">{hotel.CITY}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/50">Location</span>
              <span className="text-white/80 text-right max-w-[60%] truncate">{hotel.LOCATION}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/50">Category</span>
              <span className={`font-medium ${luxuryConf.color.split(' ')[0]}`}>{luxuryConf.label}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
