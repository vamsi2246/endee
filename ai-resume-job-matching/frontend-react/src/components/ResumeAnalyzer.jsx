import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, Search, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

const ResumeAnalyzer = ({
  resumeText,
  setResumeText,
  isAnalyzing,
  onAnalyze,
  hasAnalyzed
}) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    setErrorMsg("");
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    setIsExtracting(true);
    try {
      const response = await fetch('http://localhost:8000/upload_resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to extract text from file");
      }

      const data = await response.json();
      setResumeText(data.extracted_text);
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not read file. Make sure it's a valid PDF or Image.");
    } finally {
      setIsExtracting(false);
    }
  }, [setResumeText]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-3xl mx-auto relative group z-10"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-teal-500/20 to-cyan-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
      
      <div 
        {...getRootProps()} 
        className={`relative glass-card bg-surface/80 p-6 md:p-8 rounded-[1.5rem] border ${isDragActive ? 'border-primary shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-white/10'} shadow-2xl overflow-hidden transition-all duration-300`}
      >
        <input {...getInputProps()} />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        {isDragActive && (
          <div className="absolute inset-0 z-50 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-primary border-dashed rounded-[1.5rem]">
            <UploadCloud className="w-16 h-16 text-primary mb-4 animate-bounce" />
            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Drop your resume here!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <button onClick={open} className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all text-muted hover:text-white group/btn">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover/btn:scale-110 transition-transform">
              {isExtracting ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : <UploadCloud className="w-6 h-6 group-hover/btn:text-primary transition-colors" />}
            </div>
            <span className="font-medium text-sm">Upload PDF or Photo</span>
            <span className="text-xs text-muted/60 mt-1">Browse files or drag & drop</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all text-muted hover:text-white group/btn">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover/btn:scale-110 transition-transform">
              <FileText className="w-6 h-6 group-hover/btn:text-cyan-400 transition-colors" />
            </div>
            <span className="font-medium text-sm">Paste Text</span>
            <span className="text-xs text-muted/60 mt-1">Direct input below</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 text-sm text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
            {errorMsg}
          </div>
        )}

        <div className="relative border border-white/10 rounded-2xl bg-[#0d0d0f] overflow-hidden focus-within:border-primary/50 transition-colors">
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            disabled={isExtracting}
            placeholder={isExtracting ? "Extracting text from file..." : "Paste your resume here to analyze and match jobs..."}
            className={`w-full h-48 bg-transparent text-white p-5 outline-none resize-none text-sm leading-relaxed placeholder:text-muted/50 ${isExtracting && 'opacity-50'}`}
          ></textarea>
          
          <div className="absolute bottom-4 right-4 text-xs font-mono text-muted/60 bg-[#0d0d0f]">
            {resumeText.length} characters
          </div>
        </div>

        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-3 overflow-hidden"
            >
              <div className="flex items-center justify-between text-xs font-medium text-emerald-400">
                <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 animate-spin" /> Vectorizing your resume...</span>
                <span>Generating embedding</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={onAnalyze}
            disabled={isAnalyzing || isExtracting || !resumeText.trim()}
            className="flex items-center gap-2 bg-white text-surface hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <Search className="w-4 h-4 animate-spin" />
                Searching Endee DB...
              </>
            ) : hasAnalyzed ? (
              <>
                <Search className="w-4 h-4" />
                Find New Matches
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-primary" />
                Find Matching Jobs
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeAnalyzer;
