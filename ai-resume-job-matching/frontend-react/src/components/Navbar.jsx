import React from 'react';
import { Briefcase, Github, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 glass-card bg-surface/40 border-b-0 rounded-none px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Briefcase className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">AI Career Assistant</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
        <a href="#features" className="hover:text-white transition-colors">Features</a>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-muted hover:text-white transition-colors">
          <Github className="w-5 h-5" />
          <span className="text-sm font-medium">GitHub</span>
        </a>
        <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
          Try Now
        </button>
        <button className="md:hidden text-white p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
