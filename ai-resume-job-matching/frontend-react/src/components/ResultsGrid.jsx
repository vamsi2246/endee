import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import JobCard from './JobCard';

const ResultsGrid = ({ jobs, onRetry }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center glass-card border-white/5 h-64">
        <AlertTriangle className="w-12 h-12 text-yellow-500/50 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No strong matches found</h3>
        <p className="text-muted mb-6">Try adding more details or specific technical skills to your resume.</p>
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 bg-surface hover:bg-white/5 px-6 py-2.5 rounded-full border border-white/10 text-sm font-medium transition-colors text-white"
        >
          <RefreshCcw className="w-4 h-4" />
          Retry Search
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {jobs.map((job, index) => (
        <JobCard key={job.job_id || index} job={job} index={index} />
      ))}
    </div>
  );
};

export default ResultsGrid;
