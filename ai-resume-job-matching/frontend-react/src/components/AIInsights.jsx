import React from 'react';
import { BrainCircuit, Briefcase, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const AIInsights = ({ insights = {} }) => {
  const defaultSkills = ["Python", "React", "Machine Learning", "APIs", "SQL"];
  const defaultRoles = ["ML Engineer", "Backend Developer", "Data Scientist"];
  
  const skills = insights.skills || defaultSkills;
  const roles = insights.roles || defaultRoles;
  const level = insights.level || "Mid-Senior Level";

  return (
    <motion.aside 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full glass-card p-6 border border-white/10"
    >
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
        <div className="p-1.5 rounded-lg bg-emerald-500/20">
          <BrainCircuit className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="font-semibold text-lg">AI Insights</h3>
      </div>

      <div className="space-y-6">
        {/* Skills Section */}
        <div>
          <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Extracted Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-surface border border-white/5 rounded-full text-sm text-emerald-100 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Level Section */}
        <div>
          <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Experience Level</h4>
          <div className="flex items-center gap-2 text-sm font-medium bg-surface/50 p-3 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            {level}
          </div>
        </div>

        {/* Roles Section */}
        <div>
          <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> Recommended Roles
          </h4>
          <ul className="space-y-2">
            {roles.map((role, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-muted hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg cursor-default border border-transparent hover:border-white/5">
                <span className="text-emerald-400 font-bold text-xs">0{i+1}</span>
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.aside>
  );
};

export default AIInsights;
