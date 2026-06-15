import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function WidgetAniversarios() {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card p-5 relative overflow-hidden">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Gift size={16} className="text-pink-500" /> Aniversariantes
      </h3>
      <div className="flex items-center gap-3 bg-pink-500/10 border border-pink-500/20 p-3 rounded-xl cursor-pointer hover:bg-pink-500/20 transition">
        <img src="https://i.pravatar.cc/150?img=5" alt="Aniversariante" className="w-10 h-10 rounded-full border-2 border-pink-500" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-slate-200">Profa. Ana Clara</h4>
          <p className="text-xs text-pink-400">Fazendo aniversário hoje!</p>
        </div>
      </div>
    </motion.div>
  );
}
