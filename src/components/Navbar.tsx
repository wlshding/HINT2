import React from 'react';
import { ScanText, FileEdit, History, Sparkles, PlusCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'workspace' | 'editor' | 'history';
  setActiveTab: (tab: 'landing' | 'workspace' | 'editor' | 'history') => void;
  onNewScan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onNewScan }) => {
  return (
    <nav id="top-navbar" className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 px-4 md:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
            <div className="w-4 h-4 bg-white rounded-xs flex items-center justify-center">
              <ScanText className="w-3 h-3 text-indigo-600" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
              JD Scanner
            </span>
            <span className="text-[10px] text-slate-500 font-mono-tag tracking-wider uppercase -mt-1">
              AI ATS Gap Matcher
            </span>
          </div>
        </div>

        {/* Center Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            id="nav-landing-btn"
            onClick={() => setActiveTab('landing')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'landing'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            주요 기능
          </button>
          <button
            id="nav-workspace-btn"
            onClick={() => setActiveTab('workspace')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'workspace'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <ScanText className="w-4 h-4 text-indigo-600" />
            JD 스캐너
          </button>
          <button
            id="nav-editor-btn"
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FileEdit className="w-4 h-4 text-emerald-600" />
            실시간 에디터
          </button>
          <button
            id="nav-history-btn"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <History className="w-4 h-4 text-indigo-600" />
            내 기록
          </button>
        </div>

        {/* Right CTA / Status */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-md text-xs font-medium text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Gemini 3.6 Engine</span>
          </div>

          <button
            id="nav-new-scan-btn"
            onClick={onNewScan}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md shadow-indigo-100 active:scale-95 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>새 분석하기</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

