import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { AnalysisInputView } from './components/AnalysisInputView';
import { AnalysisResultView } from './components/AnalysisResultView';
import { ResumeEditorView } from './components/ResumeEditorView';
import { HistoryView } from './components/HistoryView';
import { AnalysisResult } from './types';
import { SAMPLE_JOBS } from './data/samples';
import { generateClientFallbackAnalysis } from './utils/fallbackAnalyzer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'workspace' | 'result' | 'editor' | 'history'>('landing');
  const [jdText, setJdText] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jd_scanner_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (newResult: AnalysisResult) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== newResult.id);
      const updated = [newResult, ...filtered];
      try {
        localStorage.setItem('jd_scanner_history', JSON.stringify(updated.slice(0, 20)));
      } catch (e) {
        console.error('Failed to save history', e);
      }
      return updated;
    });
  };

  const handleAnalyze = async () => {
    if (!jdText.trim() || !resumeText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-jd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jdText, resumeText }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: AnalysisResult = await res.json();
      setAnalysisResult(data);
      saveToHistory(data);
      setActiveTab('result');
    } catch (error) {
      console.warn('API analysis failed or server starting, using rule fallback engine:', error);
      const fallbackData = generateClientFallbackAnalysis(jdText, resumeText);
      setAnalysisResult(fallbackData);
      saveToHistory(fallbackData);
      setActiveTab('result');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (sampleId: string, matchType: 'matching' | 'weak' = 'matching') => {
    const sample = SAMPLE_JOBS.find(s => s.id === sampleId) || SAMPLE_JOBS[0];
    setJdText(sample.jdText);
    setResumeText(matchType === 'matching' ? sample.matchingResume : sample.weakResume);
    setActiveTab('workspace');
  };

  const handleLoadDemo = (sampleId: string) => {
    handleLoadSample(sampleId, 'matching');
  };

  const handleReAnalyze = async (updatedResumeText: string) => {
    setResumeText(updatedResumeText);
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-jd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jdText, resumeText: updatedResumeText }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: AnalysisResult = await res.json();
      setAnalysisResult(data);
      saveToHistory(data);
      setActiveTab('result');
    } catch (e) {
      console.warn('Re-analysis server request failed, using fallback:', e);
      const fallbackData = generateClientFallbackAnalysis(jdText, updatedResumeText);
      setAnalysisResult(fallbackData);
      saveToHistory(fallbackData);
      setActiveTab('result');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('전체 기록을 삭제하시겠습니까?')) {
      setHistory([]);
      localStorage.removeItem('jd_scanner_history');
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('jd_scanner_history', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab === 'result' ? 'workspace' : activeTab}
        setActiveTab={(tab) => {
          if (tab === 'workspace' && analysisResult) {
            setActiveTab('workspace');
          } else {
            setActiveTab(tab);
          }
        }}
        onNewScan={() => {
          setActiveTab('workspace');
        }}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {activeTab === 'landing' && (
          <HeroLanding
            onStart={() => setActiveTab('workspace')}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {activeTab === 'workspace' && (
          <AnalysisInputView
            jdText={jdText}
            setJdText={setJdText}
            resumeText={resumeText}
            setResumeText={setResumeText}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            onLoadSample={handleLoadSample}
          />
        )}

        {activeTab === 'result' && analysisResult && (
          <AnalysisResultView
            result={analysisResult}
            onOpenEditor={() => setActiveTab('editor')}
            onNewScan={() => setActiveTab('workspace')}
          />
        )}

        {activeTab === 'editor' && (
          <ResumeEditorView
            initialResumeText={resumeText}
            jdText={jdText}
            analysisResult={analysisResult}
            onReAnalyze={handleReAnalyze}
            onBackToResult={() => {
              if (analysisResult) setActiveTab('result');
              else setActiveTab('workspace');
            }}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onSelectResult={(res) => {
              setAnalysisResult(res);
              setJdText(res.rawJdText);
              setResumeText(res.rawResumeText);
              setActiveTab('result');
            }}
            onOpenEditorWithResult={(res) => {
              setAnalysisResult(res);
              setJdText(res.rawJdText);
              setResumeText(res.rawResumeText);
              setActiveTab('editor');
            }}
            onClearHistory={handleClearHistory}
            onDeleteHistoryItem={handleDeleteHistoryItem}
          />
        )}
      </main>
    </div>
  );
}
