import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';

export default function WidgetConquistas() {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card p-5 relative overflow-hidden">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Award size={16} className="text-purple-500" /> Seus Selos
      </h3>
      <div className="flex gap-3">
        <div className="bg-purple-500/20 text-purple-400 p-3 rounded-xl flex items-center justify-center border border-purple-500/30 hover:bg-purple-500/30 transition cursor-pointer" title="Vibe Coder">
          <Star size={24} />
        </div>
        <div className="bg-orange-500/20 text-orange-400 p-3 rounded-xl flex items-center justify-center border border-orange-500/30 hover:bg-orange-500/30 transition cursor-pointer" title="Top Mentor">
          <Award size={24} />
        </div>
      </div>
    </motion.div>
  );
}
