import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DifficultyBadge = ({ level }) => {
  const colors = {
    'Easy': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Medium': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Hard': 'bg-red-500/10 text-red-400 border-red-500/20'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${colors[level] || colors['Medium']}`}>
      {level}
    </span>
  );
};

const InterviewPrepCard = ({ data }) => {
  const [expandedSkill, setExpandedSkill] = useState(null);

  if (!data) return null;

  // Group questions by skill
  const grouped = {};
  data.questions?.forEach(q => {
    if (!grouped[q.skill]) grouped[q.skill] = [];
    grouped[q.skill].push(q);
  });
  const skillGroups = Object.entries(grouped);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border-white/10"
    >
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <div className="w-2 h-6 bg-orange-400 rounded-full"></div>
        Interview Preparation
      </h3>

      {/* Accordion by skill */}
      <div className="space-y-3 mb-6">
        {skillGroups.map(([skill, questions], i) => {
          const isOpen = expandedSkill === skill;
          return (
            <div key={i} className="rounded-xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setExpandedSkill(isOpen ? null : skill)}
                className="w-full flex items-center justify-between p-4 bg-surface/50 hover:bg-surface/80 transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-semibold text-white">{skill}</span>
                  <span className="text-xs text-muted">({questions.length} questions)</span>
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3 border-t border-white/5">
                      {questions.map((q, j) => (
                        <div key={j} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-background/50">
                          <p className="text-sm text-gray-300 leading-relaxed">{q.question}</p>
                          <DifficultyBadge level={q.difficulty} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      {data.tips?.length > 0 && (
        <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4">
          <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Interview Tips
          </h4>
          <ul className="space-y-2">
            {data.tips.map((tip, i) => (
              <li key={i} className="text-sm text-orange-200/80 leading-relaxed flex items-start gap-2">
                <span className="text-orange-500/50 mt-1">•</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default InterviewPrepCard;
