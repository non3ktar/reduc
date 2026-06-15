import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

export default function WidgetDuvidas() {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card p-5 relative overflow-hidden">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
        <HelpCircle size={16} className="text-blue-500" /> Mural de Dúvidas
      </h3>
      <div className="space-y-3">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 hover:border-blue-500/50 cursor-pointer transition-colors">
          <p className="text-sm text-slate-300 font-medium mb-2">"Como aplicar metodologias ativas no ensino remoto?"</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-4 h-4 rounded-full bg-slate-700 block"></span> Carlos · 0 respostas
          </div>
        </div>
      </div>
    </motion.div>
  );
}
