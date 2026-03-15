import React from 'react';
import { FileText, Award, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AIInsightsPanel = ({ insights }) => {
  if (!insights) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 border-white/10 sticky top-24"
    >
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <div className="w-2 h-6 bg-primary rounded-full"></div>
        Actionable Insights
      </h3>

      <div className="space-y-8">
        {/* Resume Summary */}
        <div>
          <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-3">
            <FileText className="w-4 h-4 text-cyan-400" /> Resume Summary
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed bg-surface/50 p-4 rounded-xl border border-white/5">
            {insights.summary || "You possess a strong background in software development with a clear focus on backend engineering and API integration. Your experience aligns well with modern scalable architectures."}
          </p>
        </div>

        {/* Top Skills */}
        <div>
          <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-emerald-400" /> Top Strengths
          </h4>
          <div className="flex flex-wrap gap-2">
            {insights.skills?.slice(0, 4).map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skill Gap Suggestions */}
        <div>
          <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-3">
            <AlertCircle className="w-4 h-4 text-yellow-400" /> Skill Gaps to Address
          </h4>
          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-3">Improve your match rates for Top AI roles by learning:</p>
            <ul className="space-y-2">
              {(insights.skillGaps?.length ? insights.skillGaps : ['Follow the advice above']).map((gap, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-yellow-200/80 font-medium">
                  <ArrowRight className="w-3 h-3 text-yellow-500/50" /> {gap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIInsightsPanel;
