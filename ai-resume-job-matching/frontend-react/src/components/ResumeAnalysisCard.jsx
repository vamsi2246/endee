import React from 'react';
import { Brain, Star, TrendingUp, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeAnalysisCard = ({ insights }) => {
  if (!insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 border-white/10 mb-10 relative overflow-hidden group"
    >
      {/* Background glow gradient */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg text-white">AI Resume Analysis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-4">
            <Cpu className="w-4 h-4 text-cyan-400" /> Detected Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {insights.skills?.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded border border-white/5 bg-surface text-xs font-medium text-emerald-100 hover:border-emerald-500/30 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
           <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-4">
            <Star className="w-4 h-4 text-yellow-400" /> Experience Level
          </h4>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/80 border border-white/5 text-sm font-medium text-white shadow-inner">
             <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
             {insights.level}
          </div>
        </div>

        <div>
           <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-4">
            <TrendingUp className="w-4 h-4 text-primary" /> Best Career Path
          </h4>
          <div className="space-y-2">
            {insights.roles?.slice(0, 3).map((role, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium text-white bg-surface/50 border border-transparent p-2 rounded-lg">
                <span className="text-primary font-bold">0{i+1}</span>
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeAnalysisCard;
