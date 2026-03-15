import React from 'react';
import { Github, Twitter, Linkedin, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#09090b] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/20 p-1.5 rounded-lg">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">AI Resume Matcher</span>
            </div>
            <p className="text-muted text-sm max-w-xs text-center md:text-left">
              Intelligent semantic search to connect top talent with the perfect tech roles using Endee Vector DB.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Endee</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm fill-muted text-muted gap-4">
          <p>© {new Date().getFullYear()} AI Resume System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
