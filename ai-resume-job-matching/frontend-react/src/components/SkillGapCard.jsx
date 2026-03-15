import React from 'react';
import { CheckCircle, XCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillGapCard = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border-white/10"
    >
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <div className="w-2 h-6 bg-cyan-400 rounded-full"></div>
        Skill Gap Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div>
          <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Skills You Have
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.matched_skills?.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" /> Skills to Learn
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.missing_skills?.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Skills */}
      {data.priority_skills?.length > 0 && (
        <div className="mt-6 bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Learn These First
          </h4>
          <div className="flex gap-3">
            {data.priority_skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-xs font-black text-amber-400">#{i + 1}</span>
                <span className="text-sm text-amber-200/80 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SkillGapCard;
