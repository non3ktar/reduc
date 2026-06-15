import React from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';

export default function WidgetEnquetes() {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card p-5 relative overflow-hidden">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
        <PieChart size={16} className="text-indigo-400" /> Enquete do Dia
      </h3>
      <p className="text-sm text-slate-200 mb-3 font-medium">Qual a melhor ferramenta para engajamento?</p>
      <div className="space-y-2">
        <button className="w-full text-left px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-indigo-500/20 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 rounded-lg transition">Kahoot</button>
        <button className="w-full text-left px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-indigo-500/20 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 rounded-lg transition">Mentimeter</button>
      </div>
    </motion.div>
  );
}
