import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 mb-8"
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-medium text-emerald-100">Powered by Endee Vector DB & all-MiniLM-L6-v2</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
      >
        Find the Perfect Job <br className="hidden md:block" />
        Using <span className="text-gradient">AI Search</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Upload your resume and discover the most relevant tech jobs using AI semantic search and vector embeddings. Don't rely on keywords. Rely on context.
      </motion.p>
    </section>
  );
};

export default Hero;
