import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ResumeAnalyzer from '../components/ResumeAnalyzer';
import ResultsHeader from '../components/ResultsHeader';
import Filters from '../components/Filters';
import ResultsGrid from '../components/ResultsGrid';
import ResumeAnalysisCard from '../components/ResumeAnalysisCard';
import AIInsightsPanel from '../components/AIInsightsPanel';
import SkillGapCard from '../components/SkillGapCard';
import ResumeImprovementCard from '../components/ResumeImprovementCard';
import CareerRoadmapCard from '../components/CareerRoadmapCard';
import InterviewPrepCard from '../components/InterviewPrepCard';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, BarChart3, FileEdit, Map, MessageSquare } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

const ProcessingOverlay = ({ steps, currentStep }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
  >
    <div className="glass-card p-10 max-w-sm w-full text-center border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
       <div className="w-16 h-16 border-4 border-surface border-t-primary rounded-full animate-spin mx-auto mb-8"></div>
       <div className="space-y-4">
         {steps.map((step, index) => (
           <div key={index} className={`flex items-center gap-3 transition-opacity duration-300 ${index === currentStep ? 'text-primary opacity-100 font-bold' : index < currentStep ? 'text-emerald-500 opacity-60' : 'text-muted opacity-40'}`}>
             <div className={`w-2 h-2 rounded-full ${index <= currentStep ? 'bg-current shadow-[0_0_8px_currentColor]' : 'bg-current'}`}></div>
             <span className="text-sm">{step}</span>
           </div>
         ))}
       </div>
    </div>
  </motion.div>
);

const TABS = [
  { id: 'jobs', label: 'Job Matches', icon: Briefcase },
  { id: 'skills', label: 'Skill Gaps', icon: BarChart3 },
  { id: 'resume', label: 'Resume Tips', icon: FileEdit },
  { id: 'roadmap', label: 'Career Roadmap', icon: Map },
  { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
];

const Home = () => {
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState('jobs');

  const [processingStep, setProcessingStep] = useState(0);
  const processingSteps = ["Analyzing Resume", "Extracting Skills", "Searching Job Database", "Generating AI Insights"];

  // Data states
  const [jobs, setJobs] = useState([]);
  const [insights, setInsights] = useState(null);
  const [skillGapData, setSkillGapData] = useState(null);
  const [resumeTips, setResumeTips] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [interviewData, setInterviewData] = useState(null);

  const [sortBy, setSortBy] = useState('match');

  const getAverageMatch = (jobsArray) => {
    if (!jobsArray || jobsArray.length === 0) return 0;
    const sum = jobsArray.reduce((acc, job) => acc + (job.match_score || 0), 0);
    return Math.round((sum / jobsArray.length) * 100);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setHasAnalyzed(false);
    setErrorMsg("");
    setProcessingStep(0);
    setActiveTab('jobs');

    try {
      const stepInterval = setInterval(() => {
        setProcessingStep(prev => prev < 3 ? prev + 1 : prev);
      }, 800);

      // Fire ALL 5 API calls in parallel
      const body = JSON.stringify({ resume_text: resumeText });
      const headers = { 'Content-Type': 'application/json' };

      const [matchRes, skillGapRes, resumeRes, roadmapRes, interviewRes] = await Promise.allSettled([
        fetch(`${API_BASE}/match_jobs`, { method: 'POST', headers, body }),
        fetch(`${API_BASE}/skill_gap_analysis`, { method: 'POST', headers, body }),
        fetch(`${API_BASE}/resume_improvement`, { method: 'POST', headers, body }),
        fetch(`${API_BASE}/career_roadmap`, { method: 'POST', headers, body }),
        fetch(`${API_BASE}/interview_questions`, { method: 'POST', headers, body }),
      ]);

      clearInterval(stepInterval);
      setProcessingStep(3);

      // Process match_jobs (primary)
      if (matchRes.status === 'fulfilled' && matchRes.value.ok) {
        const data = await matchRes.value.json();
        setJobs(data.jobs || []);
        setInsights({
          summary: data.career_advice || "We analyzed your resume to find the best matching roles.",
          skills: data.resume_skills || [],
          roles: data.recommended_roles || [],
          level: data.experience_level || "Not detected",
          detectedCount: (data.resume_skills || []).length,
          skillGaps: data.skill_gaps || []
        });
      }

      // Process secondary APIs (graceful — if any fail the tab just won't show data)
      if (skillGapRes.status === 'fulfilled' && skillGapRes.value.ok) {
        setSkillGapData(await skillGapRes.value.json());
      }
      if (resumeRes.status === 'fulfilled' && resumeRes.value.ok) {
        setResumeTips(await resumeRes.value.json());
      }
      if (roadmapRes.status === 'fulfilled' && roadmapRes.value.ok) {
        setRoadmapData(await roadmapRes.value.json());
      }
      if (interviewRes.status === 'fulfilled' && interviewRes.value.ok) {
        setInterviewData(await interviewRes.value.json());
      }

      await new Promise(r => setTimeout(r, 500));
      setHasAnalyzed(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred connecting to the backend.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'jobs':
        return (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-2/3">
              <ResultsHeader 
                jobsCount={jobs.length} 
                skillsCount={insights?.detectedCount || 0} 
                avgMatch={getAverageMatch(jobs)} 
              />
              <Filters sortBy={sortBy} setSortBy={setSortBy} />
              <ResultsGrid jobs={jobs} onRetry={() => setHasAnalyzed(false)} />
            </div>
            <div className="w-full lg:w-1/3">
              <AIInsightsPanel insights={insights} />
            </div>
          </div>
        );
      case 'skills':
        return <SkillGapCard data={skillGapData} />;
      case 'resume':
        return <ResumeImprovementCard data={resumeTips} />;
      case 'roadmap':
        return <CareerRoadmapCard data={roadmapData} />;
      case 'interview':
        return <InterviewPrepCard data={interviewData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden relative bg-[#09090b]">
      <AnimatePresence>
        {isAnalyzing && <ProcessingOverlay steps={processingSteps} currentStep={processingStep} />}
      </AnimatePresence>

      <Navbar />
      
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px]"></div>
      </div>

      <main className="flex-grow pt-8">
        {!hasAnalyzed && <Hero />}
        
        <section className={`px-6 max-w-7xl mx-auto relative z-20 pb-24 ${!hasAnalyzed ? '-mt-8' : 'pt-24'}`}>
          {errorMsg && (
            <div className="max-w-3xl mx-auto mb-4 text-sm text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-center">
              {errorMsg}
            </div>
          )}
          
          <div className={`${hasAnalyzed ? 'max-w-3xl mb-16' : ''} transition-all duration-700`}>
             <ResumeAnalyzer 
               resumeText={resumeText} 
               setResumeText={setResumeText} 
               isAnalyzing={isAnalyzing} 
               onAnalyze={handleAnalyze}
               hasAnalyzed={hasAnalyzed}
             />
          </div>
          
          {hasAnalyzed && !isAnalyzing && (
            <motion.div 
               initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            >
              <ResumeAnalysisCard insights={insights} />

              {/* Tab Navigation */}
              <div className="flex items-center gap-1 mt-8 mb-6 p-1 bg-surface/50 rounded-2xl border border-white/5 overflow-x-auto">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                        isActive 
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]' 
                          : 'text-muted hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {!hasAnalyzed && <Features />}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
