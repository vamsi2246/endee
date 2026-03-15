import React from 'react';
import { motion } from 'framer-motion';

const ResultsHeader = ({ jobsCount, skillsCount, avgMatch }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Top Job Matches for Your Resume</h2>
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted font-medium mb-6">
        <span className="bg-surface border border-white/10 px-3 py-1 rounded-full text-emerald-400">
          {jobsCount} jobs found
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
        <span className="bg-surface border border-white/10 px-3 py-1 rounded-full text-cyan-400">
          {skillsCount} skills detected
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
        <span className="bg-surface border border-white/10 px-3 py-1 rounded-full text-primary">
          Avg match {avgMatch}%
        </span>
      </div>
      
      {/* Animated divider with gradient */}
      <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent w-1/2"
        />
      </div>
    </motion.div>
  );
};

export default ResultsHeader;
