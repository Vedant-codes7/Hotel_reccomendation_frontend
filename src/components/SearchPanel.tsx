import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Wifi,
  Waves,
  Car,
  Users,
  ChevronDown,
  Sparkles,
  Loader2,
} from 'lucide-react';
import type { SearchParams, LuxuryCategory } from '../types/hotel';

interface SearchPanelProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

const CITIES = ['Mumbai', 'Kolkata', 'Bangalore', 'New Delhi'];
const LUXURY_OPTIONS: { value: LuxuryCategory; label: string }[] = [
  { value: 'BUDGET', label: 'Budget' },
  { value: 'MID RANGE', label: 'Mid Range' },
  { value: 'LUXURY', label: 'Luxury' },
];

interface AmenityToggleProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
}

function AmenityToggle({ icon, label, checked, onChange }: AmenityToggleProps) {
  return (
    <motion.button
      onClick={onChange}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${
        checked
          ? 'bg-royal-600/20 border-royal-500/50 text-royal-400'
          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white/80'
      }`}
    >
      <div className={`flex-shrink-0 ${checked ? 'text-royal-400' : 'text-white/40'}`}>
        {icon}
      </div>
      <span>{label}</span>
      <div
        className={`ml-auto w-9 h-5 rounded-full transition-all duration-300 relative flex-shrink-0 ${
          checked ? 'bg-royal-600' : 'bg-white/20'
        }`}
      >
        <motion.div
          animate={{ x: checked ? 16 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
        />
      </div>
    </motion.button>
  );
}

export default function SearchPanel({ onSearch, loading }: SearchPanelProps) {
  const [city, setCity] = useState('Mumbai');
  const [budget, setBudget] = useState(12000);
  const [rating, setRating] = useState(7);
  const [luxury, setLuxury] = useState<LuxuryCategory>('MID RANGE');
  const [wifi, setWifi] = useState(true);
  const [pool, setPool] = useState(false);
  const [parking, setParking] = useState(true);
  const [family, setFamily] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const handleSearch = () => {
    onSearch({ city, budget, rating, luxury, wifi, pool, parking, family_friendly: family });
  };

  const luxuryBudgetPercent = ((budget - 1000) / (50000 - 1000)) * 100;
  const ratingPercent = ((rating - 1) / (10 - 1)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 -mt-20"
      id="explore"
    >
      <div className="relative rounded-3xl overflow-hidden">
        {/* Glass card */}
        <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center shadow-lg">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-display font-bold text-xl">Find Your Hotel</h2>
              <p className="text-white/50 text-xs mt-0.5">Powered by AI recommendations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* City */}
            <div className="sm:col-span-1">
              <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-2">
                Destination
              </label>
              <div className="relative">
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  className="w-full flex items-center gap-3 bg-white/8 hover:bg-white/12 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-white text-sm font-medium transition-all duration-200"
                >
                  <MapPin size={16} className="text-royal-400 flex-shrink-0" />
                  <span className="flex-1 text-left">{city}</span>
                  <motion.div animate={{ rotate: cityOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-white/40" />
                  </motion.div>
                </button>
                {cityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-navy-800/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-glass z-50"
                  >
                    {CITIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCity(c); setCityOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                          c === city
                            ? 'bg-royal-600/30 text-royal-400'
                            : 'text-white/80 hover:bg-white/8 hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-2">
                Budget
                <span className="ml-2 text-gold-400 normal-case font-bold">
                  ₹{budget.toLocaleString('en-IN')}
                </span>
              </label>
              <div className="flex flex-col justify-center h-[46px] px-1">
                <div className="relative">
                  <div className="w-full h-1.5 bg-white/10 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-royal-600 to-royal-400 rounded-full transition-all duration-150"
                      style={{ width: `${luxuryBudgetPercent}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={500}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-royal-500 pointer-events-none transition-all duration-150"
                    style={{ left: `calc(${luxuryBudgetPercent}% - 10px)` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-white/30 text-[10px]">₹1K</span>
                  <span className="text-white/30 text-[10px]">₹50K</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-2">
                Min Rating
                <span className="ml-2 text-gold-400 font-bold">⭐ {rating.toFixed(1)}</span>
              </label>
              <div className="flex flex-col justify-center h-[46px] px-1">
                <div className="relative">
                  <div className="w-full h-1.5 bg-white/10 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all duration-150"
                      style={{ width: `${ratingPercent}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={0.5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-gold-500 pointer-events-none transition-all duration-150"
                    style={{ left: `calc(${ratingPercent}% - 10px)` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-white/30 text-[10px]">1.0</span>
                  <span className="text-white/30 text-[10px]">10.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Category */}
          <div className="mt-6">
            <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-3">
              Category
            </label>
            <div className="flex gap-3 flex-wrap">
              {LUXURY_OPTIONS.map((opt) => (
                <motion.button
                  key={opt.value}
                  onClick={() => setLuxury(opt.value)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                    luxury === opt.value
                      ? opt.value === 'LUXURY'
                        ? 'bg-gold-500/20 border-gold-500/50 text-gold-400'
                        : opt.value === 'MID RANGE'
                        ? 'bg-royal-600/20 border-royal-500/50 text-royal-400'
                        : 'bg-white/15 border-white/30 text-white'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                  }`}
                >
                  {opt.value === 'LUXURY' && luxury === opt.value && '✦ '}
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <AmenityToggle
                icon={<Wifi size={14} />}
                label="WiFi"
                checked={wifi}
                onChange={() => setWifi(!wifi)}
              />
              <AmenityToggle
                icon={<Waves size={14} />}
                label="Pool"
                checked={pool}
                onChange={() => setPool(!pool)}
              />
              <AmenityToggle
                icon={<Car size={14} />}
                label="Parking"
                checked={parking}
                onChange={() => setParking(!parking)}
              />
              <AmenityToggle
                icon={<Users size={14} />}
                label="Family"
                checked={family}
                onChange={() => setFamily(!family)}
              />
            </div>
          </div>

          {/* CTA */}
          <motion.button
            onClick={handleSearch}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className="mt-8 w-full py-4 bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-500 hover:to-royal-600 disabled:from-navy-700 disabled:to-navy-800 disabled:cursor-not-allowed text-white font-bold text-base rounded-2xl shadow-lg shadow-royal-600/30 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Analyzing your preferences...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate Recommendations</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/8 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
