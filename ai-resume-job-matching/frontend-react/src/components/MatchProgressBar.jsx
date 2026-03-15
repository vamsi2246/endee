import React from 'react';

const MatchProgressBar = ({ percent }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-bold mb-2">
        <span className="text-muted uppercase tracking-wider">Match Score</span>
        <span className={percent >= 80 ? 'text-primary' : percent >= 60 ? 'text-yellow-400' : 'text-orange-400'}>
          {percent}%
        </span>
      </div>
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            percent >= 80 ? 'bg-gradient-to-r from-emerald-500 to-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
            percent >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' :
            'bg-gradient-to-r from-orange-500 to-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
          }`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MatchProgressBar;
