import React from 'react';
import { MapPin, Briefcase, Bookmark, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import MatchProgressBar from './MatchProgressBar';
import SkillMatchTags from './SkillMatchTags';

const JobCard = ({ job, index }) => {
  const percent = Math.round(job.match_score * 100);
  
  // Mocking skills for the UI demonstration
  const mockMatchedSkills = ["Python", "APIs", "SQL", "Git"].slice(0, Math.max(1, Math.floor(percent / 25)));
  const mockMissingSkills = ["Docker", "Kubernetes", "Redis"].slice(0, Math.max(0, 3 - mockMatchedSkills.length));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative glass-card p-6 border-white/10 hover:border-primary/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.company || 'Unknown Company'}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Remote</span>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-gray-300">Full-time</span>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-xl text-lg font-black border ${
          percent >= 80 ? 'bg-primary/10 text-primary border-primary/20' :
          percent >= 60 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
          'bg-orange-500/10 text-orange-400 border-orange-500/20'
        }`}>
          {percent}%
        </div>
      </div>

      <div className="relative z-10">
        <MatchProgressBar percent={percent} />

        <SkillMatchTags matchedSkills={mockMatchedSkills} missingSkills={mockMissingSkills} />

        {job.reason ? (
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              AI Match Analysis
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {job.reason}
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-6">
            {job.description}
          </p>
        )}


      </div>
    </motion.div>
  );
};

export default JobCard;
