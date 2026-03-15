import React from 'react';
import { Upload, Cpu, Search } from 'lucide-react';

const Features = () => {
  return (
    <section id="how-it-works" className="py-24 border-t border-white/5 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Three simple steps powered by vector embeddings and semantic search.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="glass-card p-8 border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center mb-6 text-primary shadow-lg">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Step 1: Upload Resume</h3>
            <p className="text-muted leading-relaxed">
              Drop your PDF or paste your text. We securely parse your professional history and skills.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card p-8 border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center mb-6 text-cyan-400 shadow-lg">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Step 2: AI Extraction</h3>
            <p className="text-muted leading-relaxed">
              Our embedding model (all-MiniLM-L6-v2) converts your resume into a dense 384-dimensional vector.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-8 border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center mb-6 text-emerald-400 shadow-lg">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Step 3: Semantic Match</h3>
            <p className="text-muted leading-relaxed">
              We query the Endee Vector Database using cosine similarity to find your perfect job instantly.
            </p>
          </div>
        </div>
        
        {/* Features grid */}
        <div id="features" className="mt-32 pt-24 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="md:w-1/2">
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Powered by Tech</h2>
               <p className="text-muted text-lg">Built with performance and accuracy in mind.</p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-surface/50 border border-white/5 p-4 rounded-xl">
                <h4 className="font-bold text-white mb-1">AI Comprehension</h4>
                <p className="text-xs text-muted">Understands context, not just keywords.</p>
              </div>
              <div className="bg-surface/50 border border-white/5 p-4 rounded-xl">
                <h4 className="font-bold text-white mb-1">Vector DB</h4>
                <p className="text-xs text-muted">Powered by Endee sub-ms vector search.</p>
              </div>
              <div className="bg-surface/50 border border-white/5 p-4 rounded-xl">
                <h4 className="font-bold text-white mb-1">Semantic Search</h4>
                <p className="text-xs text-muted">Mathematically maps resume to jobs.</p>
              </div>
              <div className="bg-surface/50 border border-white/5 p-4 rounded-xl">
                <h4 className="font-bold text-white mb-1">Real-time</h4>
                <p className="text-xs text-muted">Lightning fast FastAPI processing.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
