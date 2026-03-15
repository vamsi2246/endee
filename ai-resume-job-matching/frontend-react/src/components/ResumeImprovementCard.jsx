import React from 'react';
import { Lightbulb, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeImprovementCard = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border-white/10"
    >
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <div className="w-2 h-6 bg-violet-400 rounded-full"></div>
        AI Resume Improvements
      </h3>

      {/* Strength Summary */}
      {data.strength_summary && (
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-emerald-300/90 leading-relaxed">{data.strength_summary}</p>
          </div>
        </div>
      )}

      {/* Improvement Suggestions */}
      <div className="space-y-3">
        {data.improvements?.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-white/5 hover:border-violet-500/20 transition-colors group"
          >
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center mt-0.5">
              <span className="text-xs font-black text-violet-400">{i + 1}</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">{tip}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResumeImprovementCard;
