import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const SkillMatchTags = ({ matchedSkills, missingSkills }) => {
  return (
    <div className="space-y-4 mb-6">
      {matchedSkills?.length > 0 && (
        <div>
          <p className="text-xs text-muted mb-2 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Matched Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map((s, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {missingSkills?.length > 0 && (
        <div>
          <p className="text-xs text-muted mb-2 font-medium flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 text-red-400" /> Missing Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missingSkills.map((s, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillMatchTags;
