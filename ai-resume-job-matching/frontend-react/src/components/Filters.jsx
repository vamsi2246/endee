import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const Filters = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-white/5 gap-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted" />
        <span className="text-sm font-medium text-white">Filters:</span>
        <div className="flex gap-2 ml-2">
          {['Remote', 'Full-time', 'Senior'].map((filter) => (
            <button key={filter} className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-muted hover:text-white hover:border-white/30 transition-colors bg-surface/50">
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted">Sort by:</span>
        <div className="relative">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-surface/80 border border-white/10 text-white text-sm rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            <option value="match">Best Match</option>
            <option value="newest">Newest Jobs</option>
            <option value="salary">Highest Salary</option>
          </select>
          <ChevronDown className="w-4 h-4 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
