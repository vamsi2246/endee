import React from 'react';
import { Map, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const CareerRoadmapCard = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border-white/10"
    >
      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
        <div className="w-2 h-6 bg-primary rounded-full"></div>
        Career Roadmap
      </h3>

      {data.target_role && (
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-semibold">Target: {data.target_role}</span>
        </div>
      )}

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-cyan-500 to-violet-500"></div>

        <div className="space-y-4">
          {data.steps?.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              {/* Dot on the timeline */}
              <div className="absolute -left-5 top-3 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>

              <div className="p-4 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">
                    <span className="text-primary mr-2">Step {step.step_number}.</span>
                    {step.title}
                  </h4>
                  <span className="flex items-center gap-1 text-xs text-muted bg-white/5 px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3" /> {step.duration}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CareerRoadmapCard;
